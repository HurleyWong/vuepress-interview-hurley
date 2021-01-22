# Activity

## Activity生命周期

* 启动Activity：`onCreate()`⟶`onStart()`⟶`onResume()`，进入运行状态；
* Activity退居后台（Home或者启动了新的Activity）：`onPause()`⟶`onStop()`；
* Activity返回前台：`onRestart()`⟶`onStart()`⟶`onResume()`;
* 如果Acitivity后台期间内存不足，再次启动时就会重新执行启动流程；
* 锁屏：`onPause()`⟶`onStop()`；
* 解锁：`onStart()`⟶`onResume()`；

**具体方法介绍**：
* `onCreate()`：在每个Activity中都会重写这个方法，它会在活动第一次被创建的时候调用；
* `onStart()`：这个方法由不可见变为可见时调用；
* `onResume()`：这个方法在Activity准备好和用户进行交互时调用。此时的活动肯定位于活动返回栈的栈顶，并且处于运行状态；
* `onPause()`：这个方法是当系统准备启动或者恢复另一个活动的时候调用。通常会在这个方法里释放一些非常消耗CPU的资源等；
* `onStop()`：这个方法在完全不可见的时候调用；
* `onDestroy()`：这个方法在活动被销毁之前调用，之后活动的状态将变为销毁状态；
* `onRestart()`：这个方法在活动由停止状态变为运行状态之前调用，即活动被重新启动了

![Activity的生命周期](https://s1.ax1x.com/2020/05/01/JO9941.png)

**三个时期**：

* **完整生存期**：活动在`onCreate()`到`onDestroy()`方法之间所经历的就是**完整生存期**。一般情况下，一个活动会在`onCreate()`方法中完成各种初始化操作，而在`onDestroy()`方法中完成释放内存的操作；
* **可见生存期**：活动在`onStart()`到`onStop()`方法之间所经历的就是**可见生存期**。**可见生存期的**的意思就是活动对于用户总是可见的（即使有可能与用户无法交互）；
* **前台生存期**：活动在`onResume()`和`onPause()`方法之间的就是时期就是**前台生存期**。在**前台生存期**内，活动总是处于运行状态的，即此时的活动是可以和用户进行交互的。

### 横竖屏切换时Activity的生命周期变化

这需要判断`AndroidManifest.xml`中是否设置了`configChanges`属性。而`configChanges`常用的属性有：
* `orientation`：屏幕在纵向和横向间旋转
* `keyboardHidden`：键盘显示或者隐藏
* `screenSize`：屏幕大小改变了

**`AndroidManifest`没有设置`configChanges`属性**

如果是从**竖屏启动切换横屏**：

**竖屏启动**：`onCreate()`⟶`onStart()`⟶`onResume()`**切换横屏**：`onPause()`⟶`onSavedInstanceState()`⟶`onStop()`⟶`onDestroy()`⟶`onCreate()`⟶`onStart()`⟶`onRestoreInstanceState()`⟶`onResume()`⟶`onPause()`⟶`onStop()`⟶`onDestroy()`（Android6.0、7.0、8.0适用）

如果是从**横屏启动切换竖屏**：

生命周期与**从竖屏启动切换横屏一样**。

**总结**：如果没有设置`configChanges`属性的话，在Android6.0、7.0、8.0的手机上表现是一样的。首先是正常地走一遍流程（在`onPause()`之后会有`onSavedInstanceState()`），然后重新创建之后在`onStart()`之后会有`onRestoreInstanceState()`。

**`AndroidManifest`设置了`android:configChanges="orientation"`**

如果是从**竖屏启动切换横屏**：

**Android 6.0 竖屏启动**：`onCreate()`⟶`onStart()`⟶`onResume()`**切换横屏**：`onPause()`⟶`onSavedInstanceState()`⟶`onStop()`⟶`onDestroy()`⟶`onCreate()`⟶`onStart()`⟶`onRestoreInstanceState()`⟶`onResume()`⟶`onPause()`⟶`onStop()`⟶`onDestory()`

**Android 7.0 竖屏启动**：`onCreate()`⟶`onStart()`⟶`onResume()`**切换横屏**：`onConfigurationChanged()`⟶`onPause()`⟶`onSavedInstanceState()`⟶`onStop()`⟶`onDestroy()`⟶`onCreate()`⟶`onStart()`⟶`onRestoreInstanceState()`⟶`onResume()`⟶`onPause()`⟶`onStop()`⟶`onDestroy()`

**Android 8.0 竖屏启动**：`onCreate()`⟶`onStart()`⟶`onResume()`**切换横屏**：`onConfigurationChanged()`

**总结**：在设置了`configChanges`属性为`orientation`之后，Android 6.0的生命周期与没有设置是一样的。而Android 7.0则会先多回调一个`onConfigurationChanged()`方法，剩下的流程一样。Android 8.0则只是回调了`onConfigurationChanged()`方法，并没有走Activity生命周期的方法。

如果是从**横屏启动切换竖屏**：

生命周期与**从竖屏启动切换横屏一样**。

`AndroidManifest`设置了`android:configChanges="orientation|keyboardHidden|screenSize"`

**竖屏启动**：`onCreate()`⟶`onStart()`⟶`onResume()`**切换横屏**：`onConfigurationChanged()`（Android6.0、7.0、8.0适用）

**总结**：当设置了`android:configChanges="orientation|keyboardHidden|screenSize`时，就不会调用Activity其它生命周期的方法，只会调用`onConfigurationChanged()`方法。

**`AndroidManifest`设置了`android:configChanges="orientation|screenSize"`**

与`orientation|keyboardHidden|screenSize`相同，只回调`onConfigurationChanged()`方法。

**`AndroidManifest`设置了`android:configChanges="orientation|keyboardHidden"`**

与只设置了`orientation`的相同，Android 6.0、7.0会回调生命周期的方法，Android 8.0则只回调`onConfigurationChanged()`方法。

**总结（不同手机系统系统可能会有略微差异）**

1. 不设置`configChanges`属性是不会回调`onConfigurationChanged()`方法的，且切屏的时候会回调生命周期的方法；
2. 只有设置了`orientation`和`screenSize`才会保证不会调用生命周期的方法，且切屏的时候只会回调`onConfigurationChanged()`方法；
3. 如果设置了`orientation`而没有设置`screenSize`，那么切屏就会调用`onConfigurationChanged()`方法，但仍然会走生命周期；

### Activity A启动了Activity B，它们的生命周期的变化

1. **启动Activity A**

   `onCreate()`创建活动A，`onStart()`显示在屏幕上，`onResume()`处于运行状态；

2. **在Activity A中启动Activity B**

   活动A被暂停，使用`onPause()`进入暂停状态；`onCreate()`创建活动B，`onStart()`显示活动B在屏幕上，`onResume()`让活动B进入运行状态；活动A经过`onStop()`进入停止状态；

3. **从Activity B中返回Activity A（比如按物理返回键）**

   活动B用`onPause()`方法进入暂停状态；活动A被重启，使用`onRestart()`方法从停止状态进入活动状态，调用`onStart()`方法使活动A显示在屏幕上，`onResume()`方法进入运行状态；活动B被`onStop()`方法进入停止状态，最后使用`onDestroy()`方法销毁；

4. **继续按物理返回键**

   活动A用`onPause()`方法暂停，然后用`onStop()`方法停止，最后用`onDestroy()`方法被销毁；

### `onSaveInstanceState()`和`onRestoreInstanceState()`调用的过程和时机

* **调用时机**：Activity的异常情况下（例如转动屏幕或者被系统回收）的情况下，会调用到`onSaveInstanceState`和`onRestoreInstanceState`。如果是单独按Home或者启动新Activity仍然会单独触发`onSaveInstanceState`调用。
* **调用过程**：在**异常情况**下，会在调用`onStop()`方法之前，调用`onSaveInstanceState`方法保存；而新的Activity重建时，就可以通过`onRestoreInstanceState`方法取出之前保存的数据并恢复，`onRestoreInstanceState`的调用时机在`onCreate()`之后。

### 优先级低的Activity在内存不足被回收后怎么做可以恢复到销毁前状态 <Badge text="Uncompleted"/>

## Activity四种启动模式

### standard标准模式

是默认启动的模式，每次都会新创建一个实例对象；每次发送的Intent都会创建一个新的Activity（`onCreate()`⟶`onStart()`⟶`onResume()`），并且将其放入返回栈的栈顶。这样每次都新建一个实例的话太浪费。

### singleTop栈顶复用模式

如果在返回栈顶发现了相同的实例则重用，不会新建；否则就新建并压入栈顶；同时Activity的`onNewIntent()`方法会被回调。在这个模式下，我们必须同时在`onCreate()`和`onNewIntent()`两个方法中处理好传入的Intent

### singleTask栈内复用模式

如果在整个返回栈中发现了相同的实例，就将其最上面的任务终止并移除，重用该实例，同时回调`onNewIntent()`方法；否则新建实例并压入栈；

### singleInstance单实例模式

允许不同的应用，进程线程等共用一个实例，无论如何应用调用该实例都会重用；即持有这个Activity的Task不能再有其它Activity的实例了；

例如，如果从这个Activity中启动另外一个不同的Activity，将会自动创建一个新的Task来存放新的Activity；如果从一个已经存在许多Activity的的Task中调用启动模式是`singleInstance`的Activity，这个新的Activity同样会被放在一个新的Task中。不管怎么样，都会创建一个新的Task来存放Activity。

### 什么情况下分别使用上面四种不同的启动模式 <Badge text="Uncompleted"/>

### `onNewIntent()`调用时机

如果一个Activity的启动模式是`singleTop`、`singleTask`、`singleInstance`，在复用Activity时就会在「调用`onStart()`方法之前调用`onNewIntent()`方法」。作用就是让已经创建的Activity处理新的Intent。

### Activity的启动过程 <Badge text="Uncompleted"/>