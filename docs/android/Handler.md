# Handler

Android应用程序被创建的时候都会创建一个UI主线程，但有时会有一些比较耗时的操作，为了防止阻塞UI主线程，我们会将耗时的操作放到子线程中进行处理，处理完之后操作UI，但是Android不允许子线程操作UI，因为违背了Android单线程模型的原则（即Android UI操作并不是线程安全的并且这些操作必须在UI线程中执行）。

消息传递机制主要是为了解决Android应用的多线程问题。Handler是一种异步回调机制，它可以在完成一个耗时任务后做出相应的通知。

* **主线程（UI线程）**：当程序第一次启动时，Android会同时启动一个主线程，主要负责处理与UI系相关的事件；
* **Message**：Handler用来接收和处理的消息对象（Bean对象），作用是通信时相关信息的存放和传递；
* **ThreadLocal**：是线程内部的存储类，通过它可以实现在每个线程中存储自己的私有数据。即数据存储以后，只能在指定的线程中获取这个存储的对象，而其它线程则不能获取到当前线程存储的这个对象。作用简要来说就是负责存储和获取本线程的Looper；
* **Message Queue**：采用单链表的数据结构来存储消息列表，用来存放通过Handler发送过来的Message，按照先进先出的方式执行；
* **Handler**：就是Message的主要处理者，负责发送Message到消息队列和处理Looper分派过来的Message；
* **Looper**：扮演Message Queue和Handler之间的一个桥梁的角色。它循环取出Message Queue中的Message，将取出的Message交付给相应的Handler；

**调用流程**：

1. 首先调用`Looper.prepare()`方法，会创建一个Looper实例，该实例包含一个MessageQueue，并将该实例保存在当前线程中Threadlocal
2. 调用`Looper.loop()`开始消息循环，不断地向MessageQueue中读取消息，并调用`msg.target.dispatchMessage(msg)`来处理消息
3. 构建Handler的时候，会先获取到当前Handler所在线程的Looper并得到其中的MessageQueue
4. 使用Handler发送消息的时候，会将一个Message到保存当前线程Looper中的MessageQueue
5. 当`Looper.loop()`获取到消息的时候，调用`msg.target.dispatchMessage(msg)`来处理消息,其实`Message.target = handler`也就是调用Handler的dispatchMessage来处理
6. Handler的dispatchMessage最终回去调用handlerMessage方法。到这里就知道，其实Handler的handler在哪条线程执行，取决于构建Handler时所使用的是哪条线程保存的Looper，因为handlerMessage其实是Looper去调用的。

## Handler消息传递机制工作原理

首先需要在主线程当中创建一个Handler对象，并重写`handleMessage()`方法。然后当子线程中需要进行UI操作时，就创建一个Message对象，并通过Handler将这条消息发送出去。之后这条消息会被添加到MessageQueue的队列中等待被处理。`Looper.prepare()`中会先判断线程是否有Looper实例，没有就创建一个Looper实例，然后加入本线程的ThreadLocal中。而Looper则会一直尝试从MessageQueue中使用`loop()`方法取出待处理消息，最后分发回Handler的`handleMessage()`方法中。由于Handler是在主线程中创建的，所以此时handleMessage()方法中的代码也会在主线程中运行，于是就可进行UI操作了。一条Message经过这样一个流程的辗转调用后，也就从子线程进入到了主线程，从不能更新UI变成了可以更新UI，整个异步消息处理的核心思想就是如此。
「Handler消息机制中的主要功能都由 MessageQueue 和 Looper 去实现了，Handler 主要用于往队列里插入 Message 和 执行 Looper 取出的 Message 两个过程。」

Android消息机制中引入了消息池。Handler创建消息时首先查询消息池中是否有消息存在，如果有直接从消息池中取得，如果没有则重新初始化一个消息实例。使用消息池的好处是：消息不被使用时，并不作为垃圾回收，而是放入消息池，可供下次Handler创建消息时使用。消息池提高了消息对象的复用，减少系统垃圾回收的次数。

## 一个Thread可以有几个Looper？几个Handler？

由于使用了ThreadLocal机制，所以注定了一个线程只能有一个Looper，但Handler可以new无数个，它们使用的消息队列都是同一个，也就是同一个Looper。

在主线程可以直接使用handler，是因为主线程已经默认帮我们初始化了Looper，调用了`Looper.prepare()`和`loop()`方法，我们可以在主线程定义多个handler都不用自己生成或绑定Looper，所以一个线程只有一个Looper。

## 如何将一个Thread线程变成Looper线程？Looper线程有哪些特点？

我们知道Thread是不具备消息循环的，而Looper恰恰弥补了这点，通过`Looper.prepare()`方法可以将一个Thread线程转换成Looper线程。Looper类管理线程的消息队列和消息循环，具体来说是为一个线程开启一个消息循环，Looper对象通过MessageQueue来存放消息和事件。一个线程只能有一个Looper，对应一个MessageQueue。而一个Looper对象可以对应多个线程，比如主线程的mainLooper，供主线程和所属子线程共同使用。

## 为什么在子线程中创建Handler会抛出异常

因为这样创建的话，Handler的源码里的mLooper会为null，所以抛出异常。即线程中的mLooper还未被创建，所以`Looper.myLooper()`中的`sThreadLocal.get()`就会返回null值。

MessageQueue是存在于Looper中的，如果没有Looper就没有MessageQueue，所以创建Handler时，Looper不能为空。Looper对象是通过`Looper.prepare()`方法创建的。

## 主线程的Looper是轮询死循环为何没有阻塞主线程

为什么主线程中的`Looper.loop()`方法一直在无限循环地检测消息队列中是否有新的消息，却不会造成ANR？

因为Looper的作用是持有一个Message Queue，这个消息队列中存放着外部来的消息。当有消息过来的时候，Looper就会按顺序把消息一个个取出来进行处理。所以，「只有没有输入事件，此时Message Queue是空的，**Looper进行空闲状态，线程才会进入阻塞**，释放CPU，等待输入事件的唤醒」。

## 使用Handler的`postDelay()`后消息队列会发生什么变化

在`postDelay()`这个方法内，如果头部的Message有延迟并且延迟时间内没收到，就会计算时间。在循环开始的时候判断如果这个Message有延迟，那么就会调用某个方法进行阻塞。这个方法的作用相当于`Object.wait()`。

`postDelay()`的Message并不是先等待一定时间再放入到MessageQueue中，而是直接进入并阻塞当前线程，然后将其delay的时间和队头的进行比较，按照触发时间进行排序，如果触发时间更近则放入队头，保证队头的时间最小、队尾的时间最大。此时，如果队头的Message正是被delay的，则将当前线程堵塞一段时间，直到等待足够时间再唤醒执行该Message，否则唤醒后直接执行。

## Message可以如何创建？哪种效果更好，为什么？

创建Message对象的几种方式：

* `Message msg = new Message();`
* `Message msg = Message.obtain();`
* `Message msg = handler.obtainMessage();`

第一个就最普通的new一个新的Message对象，而后两个是从整个Message池中返回一个新的Message实例，能够有效地避免重复的Message创建对象，因此更鼓励后两种方式。

## runOnUiThread如何实现子线程更新UI

在`runOnUiThread`程序中，会首先判断当前线程是否是UI线程，如果是就直接运行；如果不是则post，本质上还是使用Handler机制来处理线程与UI通信。Handler的handlerMessage()方法的执行是在主线程中。

## ThreadLocal有什么作用？如何避免UI线程尽量只做跟UI相关的工作?

* 线程本地存储的功能

ThreadLocal类可实现线程本地存储的功能，**把共享数据的可见范围限制在同一个线程之内**，无须同步就能保证线程之间不出现数据争用的问题，这里可理解为ThreadLocal帮助Handler找到本线程的Looper。

* 怎么存储呢？底层数据结构是什么

每个线程的Thread对象中都有一个ThreadLocalMap对象，它存储了一组以`ThreadLocal.threadLocalHashCode为key`、以本地线程变量为value的键值对，而ThreadLocal对象就是当前线程的ThreadLocalMap的访问入口，也就包含了一个独一无二的threadLocalHashCode值，通过这个值就可以在线程键值值对中找回对应的本地线程变量。

* 如何避免UI线程尽量只做跟UI相关的工作

耗时的操作(比如数据库操作，I/O,连接网络或者别的有可能阻塞UI线程的操作)把它放在单独的线程处理尽量用Handler来处理UIthread和别的thread之间的交互。使用Thread或者HandlerThread时，调用`Process.setThreadPriority(Process.THREAD_PRIORITY_BACKGROUND)`设置优先级，否则仍然会降低程序响应，因为默认Thread的优先级和主线程相同。使用Handler处理工作线程结果，而不是使用`Thread.wait()`或者`Thread.sleep()`来阻塞主线程。