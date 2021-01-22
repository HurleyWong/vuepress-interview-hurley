# Window

## Activity、View、Window之间的关系

Activity是界面载体，可以展示页面；而View实际上是一个个视图，这些视图可以搭载在一个Layout文件上，通过Activity的`setContentView()`方法传递给Activity；Window是一个窗体，每个Activity对应一个Window，通常在代码中通过`getWindow()`方法获取它。

> 每个Activity包含了一个Window对象，这个对象是由PhoneWindow实现的。PhoneWindow将内部的DecorView作为了一个应用窗口的根View，这个DecorView又把屏幕划分为了两个区域：一个是ActionBar（TitleBar），一个是ContentView。我们平时编写的XML文件布局就是展示在ContentView中。

![Activitiy、View、Window之间的关系](https://s1.ax1x.com/2020/05/02/JjBNu9.png)

## Window有哪几种类型

* **应用Window**：对应一个Activity
* **子Window**：不能单独存在，需附属特定的父Window。比如Dialog。
* **系统Window**：需要申明权限才可以创建，比如Toast

Window是分层的，层级大的会覆盖在层级小的Window上面，对应的是`WindowManager.LayoutParams`的`type`参数。

| Window | 层级 |
| :--------------: | :-------------: |
| 应用Window |       1~99        |
| 子Window |       1000~1999        |
| 系统Window |       2000~2999        |