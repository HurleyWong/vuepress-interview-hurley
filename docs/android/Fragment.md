# Fragment

## Fragment的生命周期

![Fragment的生命周期](https://s1.ax1x.com/2020/05/01/JOCbOU.png)

**具体方法介绍**：

1. `onAttach()`：完成Fragment与Activity的绑定，参数中的Activity即为要绑定的Activity，可以进行赋值等操作；
2. `onCreate()`：完成Fragment的初始化；
3. `onCreateView()`：加载View布局，绑定布局文件；
4. `onActivityCreated()`：与Fragment绑定的Activity已经执行完成了`onCreate()`，可以与Activity进行交互操作；
5. `onStart()`：Fragment变为可见状态；
6. `onResume()`：Fragment变为可交互状态；
7. `onPause()`：Fragment变为不可交互状态（不代表是不可见）；
8. `onSaveInstanceState()`：保存当前Fragment的状态，记录一些数据；
9. `onStop()`：Fragment变为不可见状态；
10. `onDestroyView()`：销毁Fragment的有关视图，但并未和Activity解绑，还可以通过`onCreateView()`重新创建视图；
11. `onDestroy()`：销毁Fragment时调用；
12. `onDetach()`：解除和Activity的绑定，是Fragment销毁的最后一步。

添加Fragment可以分为**静态添加**和**动态添加***两类。**静态添加**是指在XML中直接Fragment，缺点是添加之后不能删除。一般推荐是在代码中FragmentManager中使用一系列的`FragmentTransaction`事务操作动态控制。
* `add`
* `remove`
* `show`
* `hide`
* `replace`
* `replace`+`addToBackStack`
* `detach`

## Activity与Fragment的异同

* 相同点：Activity与Fragment都可以包含布局，都有自己的生命周期；
* 不同点：因为Fragment是依附在Activity上的，多了一些和宿主Activity相关的生命周期方法，例如`onAttch()`、`onActivityCreated()`、`onDetach()`等；Fragment的生命周期方法都是由宿主Activity而不是由操作系统调用的，Activity中的生命周期方法都是是`protected`，而Fragment的生命周期方法都是`public`，因为Activity需要调用Fragment这些方法并管理它。

## Activity和Fragment的关系

* Fragment的出现是为了解决Android碎片化，可以作为Activity界面的组成部分，可以在Activity运行中实现动态地加入、移除和交换；
* 一个Activity可以同时出现多个Fragment，而一个Fragment也可以在多个Activity中使用；
* Activity中的`FragmentManager`负责调用队列中Fragment的生命周期方法；