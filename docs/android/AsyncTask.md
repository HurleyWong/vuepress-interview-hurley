# AsyncTask

AsyncTask，是Android提供的轻量级的异步类，可以直接继承AsyncTask，在类中实现异步操作，并提供接口反馈当前异步执行的程度（可以通过接口实现UI进度更新），最后反馈执行的结果给UI主线程。

```Java
public abstract class AsyncTask<Params, Progress, Result> {
}
```

AsyncTask中有4个核心方法，如下所示：

* `onPreExecute()`：在主线程中执行，一般在任务执行前做准备工作，比如对UI做一些标记；
* `doInBackground(Params...params)`：在线程池中运行，用来执行较为耗时的操作；
* `onProgressUpdate(Progress...values)`：在主线程中运行，将进度更新到UI组件上；
* `onPostExecute(Result result)`：在主线层中执行。

AsyncTask用到了线程，在线程池中运行线程，并且用到了阻塞队列。

## AsyncTask原理

当调用`execute(Params...params)`方法后，`execute`方法会调用`onPreExecute()`方法，然后由`ThreadPoolExecutor`实例执行一个`FutureTask`任务，这个过程中会调用`doInBackground(Params...params)`方法；如果开发者重写了`doInBackground`方法，那么会通过`InternalHandler`实例发送`MESSAGE_POST_PROGRESS`消息，更新进度。当任务异常时，会发送`MESSAGE_POST_CANCEL`消息，取消任务；如果执行成功，就发送`MESSAGE_POST_RESULT`消息，`InternalHandler`实例会调用`onPostExecute(Result result)`方法在UI线程处理结果。

> AsyncTask就是线程池加上Handler的封装，减少了开发者处理问题的复杂度，提高了开发效率。

## AsyncTask相比Handler有什么优点和缺点

**优点**：

简单、快捷，过程可控

**缺点**：

在使用多个异步操作和需要改变UI时，会相对变得复杂。

## 使用AsyncTask需要注意什么 <Badge text="Uncompleted"/>

## AsyncTask中使用的线程池大小

在AsyncTask内部实现有**两个**线程池：

SerialExecutor：用于任务的排队，默认是串行的线程池，在3.0以前核心线程数为5、线程池大小为128，而3.0以后变为同一时间只能处理一个任务；
THREAD_POOL_EXECUTOR：用于真正执行任务。

## HandlerThread有什么特点

HandlerThread是一个线程类，它继承自Thread。与普通Thread不同，HandlerThread具有消息循环的效果，这是因为它内部HandlerThread.run()方法中有Looper，能通过Looper.prepare()来创建消息队列，并通过Looper.loop()来开启消息循环。

* HandlerThread本质上是一个线程类，它继承了Thread；
* HandlerThread有自己的内部Looper对象，可以进行looper循环；
* 通过获取HandlerThread的looper对象传递给Handler对象，可以在handleMessage方法中执行异步任务；
* 创建HandlerThread后必须先调用`HandlerThread.start()`方法，Thread会先调用`run()`方法，创建Looper对象。

## HandlerThread常规使用步骤

1. 创建实例对象

    `HandlerThread handlerThread = new HandlerThread("downloadImage");`

    传入参数的作用主要是标记当前线程的名字，可以任意字符串。

2. 启动HandlerThread线程

    ```Java
    // 必须先开启线程
    handlerThread.start();
    ```

    到此，我们创建完HandlerThread并启动了线程。那么我们怎么将一个耗时的异步任务投放到HandlerThread线程中去执行呢？

3. 构建循环消息处理机制

    ```Java
    /**
     * 该callback运行于子线程
     */
    class ChildCallback implements Handler.Callback {
        @Override
        public boolean handleMessage(Message msg) {
            // 在子线程中进行相应的网络请求

            // 通知主线程去更新UI
            mUIHandler.sendMessage(msg1);
            return false;
        }
    }
    ```

4. 构建异步handler

    ```Java
    // 子线程Handler
    Handler childHandler = new Handler(handlerThread.getLooper(), new ChildCallback());
    ```

第3步和第4步是构建一个可以用于异步操作的handler，并将前面创建的HandlerThread的Looper对象以及Callback接口类作为参数传递给当前的handler，这样当前的异步handler就拥有了HandlerThread的Looper对象，由于HandlerThread本身是异步线程，因此Looper也与异步线程绑定，从而handlerMessage方法也就可以异步处理耗时任务了，这样我们的Looper+Handler+MessageQueue+Thread异步循环机制构建完成。

## 快速实现子线程使用Handler <Badge text="Uncompleted"/>