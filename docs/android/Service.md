# Service

## Service的两种启动方式和生命周期

Service有两种启动方式，一种是通过`startService()`来启动的，另一种是通过`bindService()`来启动的；

![Service的生命周期](https://s1.ax1x.com/2020/05/01/JO9lgf.png)

### 通过`startService()`来启动（各自飞）

![startService()的生命周期](https://i.loli.net/2021/01/07/5RG1iTkAL2yYZ3o.png)

**使用方法**：

1. 定义一个类，并继承Service
2. 在`AndroidManifest.xml`文件中配置此Service
3. 使用Context的`startService(Intent)`方法来启动此Service
4. 不使用该服务时，调用`stopService(Intent)`方法停止此Service（当使用IntentService时调用`stopSelf`方法）

> 如果服务已经开启，就不会重复地执行`onCreate()`方法，而是调用`onStart()`或者`onStartCommand()`方法。服务停止时就调用`onDestroy()`方法。

**特点**：

* 一旦服务开启了，就与开启者没有任何关系了
* 开启者退出之后，服务还是可以在后台长期运行的（前提是没有调用`stopService(Intent)方法`）
* 开启者不能调用服务里面的方法

### 通过`bindService()`来启动（共存亡）

![bindService()的生命周期](https://i.loli.net/2021/01/07/QLOVMi8X1JYoEbG.png)

**使用方法**：
1. 定义一个类，并继承Service
2. 在`AndroidManifest.xml`文件中配置此Service
3. 使用Context的`bindService(Intent, ServiceConnection, int)方法来启动此Service`
4. 不使用该服务时，调用`unbindService(ServiceConnection)方法停止此Service`

> 绑定服务是不会调用`onStart()`或者`onStartCommand()`方法的。

**特点**：
* 使用`onBind()`的方式开启服务绑定服务，如果调用者销毁，服务也会被销毁
* 绑定者可以调用服务内部的方法

### 如果一个Service既被`startService()`启动又被`bindService()`启动，生命周期是怎么样的（或者问如何把Service停止）

1. `startService()`和`bindService()`可以同时启动同一Service，执行时会回调对应的`onStartCommand()`或者`onBind()`方法，但是`onCreate()`方法只会被执行一次，不会被重复执行；
2. 在停止Service时，既需要调用`stopService()`方法，又需要调用`unBindService()`方法，没有先后顺序要求，只有两个方法都执行完毕之后，才会执行Service的`onDestroy()`方法，`onDestroy()`方法只会被执行一次（最后一个`stopService`或者`unBindService`方法会导致Service执行`onDestroy()`）。

### Service的生命方法运行在哪个线程中

Service默认运行在主线程中，所以其生命方法也是运行在主线程中。如果需要在Service中进行耗时的操作，那必须另起线程或者使用IntentService，否则会引起ANR。

## IntentService与Service的区别

* Service默认运行在主线程中，如果需要耗时的操作，就必须开启子线程；而IntentService可用于长时间的任务，通常不会与主线程通信。如果需要通信，可以使用主线程处理程序或者广播意图。另一种使用情况是需要回调（意图触发任务）。
* Service是由`startService()`方法触发，而IntentService是使用Intent触发的，产生了一个新的工作线程，并且在这个线程上调用了`onHandlerIntent()`方法。
* Service和IntentService可以从任何线程，活动或其它应用程序组件中触发
* Service在后台运行，但是是在应用程序的主线程运行；IntentService在单独的工程线程中运行；
* Service可能会阻止应用程序的主线程；IntentService不能并行执行任务，所以所有连续的Intent都将进入工程线程的消息队列并将按顺序执行；
* 如果使用Service，是调用`stopSelf()`或者`stopService()`来结束它的工作；而IntentService会在处理完所有启动请求后停止服务，不必调用方法；

**IntentService的优点**：

* 会创建独立的工作线程来处理所有的Intent请求；
* 会创建独立的工作线程来处理`onHandleIntent()`方法实现的代码，无需处理多线程问题；
* 在所有请求处理完成后，IntentService会自动停止；
* 为Service的`onBind()`方法提供默认实现，返回`null`；
* 为Service的`onStartCommand()`方法提供默认实现，将请求Intent添加到队列中；
* IntentService不会阻塞UI线程；
* IntentService若未执行完成上一次的任务，不会重新开启一个线程，而是等待之前的任务完成后，再执行新的任务，等任务完成后再次调用`stopSelf()`方法

## 如何保证Service不被杀死（如何提高Service的优先级）

1. **在`onStartCommand()`方法中返回`START_STICKY`**。这种情况下，当内存不足需要回收该Service时，系统会将该Service标记为`started`状态，并在合适的时机重新调用`onStartCommand()`方法重新启动该Service，这种情况下不会保留`onStartCommand()`方法中的`intent`对象（`intent`对象为`null`）。如果需要在重启Service时保留`onStartCommand()`中的`intent`对象，就可以返回`START_REDELIVER_INTENT`，此时则会保留`intent`最近一次的值，并传入到`onStartCommand()`方法中。
2. **提高该Service在所有Service中的优先级**。可以在`AndroidManifest.xml`中为每一个Service都配置一个优先级`android:priority`，数值越大，优先级就越高。
3. **将Service设置为前台Service**。因为Service是默认在后台运行的，但调用`Service.startForeground()`就可以将该Service设置为前台Service，从而提高Service的优先级。当系统的进程空间紧张时，会按照进程优先级依次回收，Android系统的进程优先级如下：
   1. 前台进程（foreground_app）
   2. 可见进程（visible_app）
   3. 次要服务进程（secondary_app）
   4. 后台进程（hidden_app）
   5. 内容提供者进程（content_provider）
   6. 空进程（empty_app）
4. **在Service的`onDestroy()`方法里发送一个自定义广播**，在广播的`onReceiver()`里重新启动该Service。
5. **监听开机广播，开机时自动启动Service**。

## Service与Activity如何实现通信

可以通过`bindService()`的方式。先在Activity里实现一个ServiceConnection接口，并将该接口传递给`bindService()`方法，在ServiceConnection接口的`onServiceConnected()`方法里执行相关操作。

## 常用的系统Service

|       传入的Name        |     返回的对象      |          说明          |
| :---------------------: | :-----------------: | :--------------------: |
|     WINDOW_SERVICE      |    WindowManager    |   管理打开的窗口程序   |
| LAYOUT_INFLATER_SERVICE |   LayoutInflater    |  取得XML里定义的View   |
|    ACTIVITY_SERVICE     |   ActivityManager   | 管理应用程序的系统状态 |
|      POWER_SERVICE      |    PowerManager     |        电源服务        |
|      ALARM_SERVICE      |    AlarmManager     |        闹钟服务        |
|  NOTIFICATION_SERVICE   | NotificationManager |       状态栏服务       |
|    KEYGUARD_SERVICE     |   KeyguardManager   |       键盘锁服务       |