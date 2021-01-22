# View

## View的绘制流程

1. 测量——`onMeasure()`：决定View的大小
2. 布局——`onLayout()`：决定View在ViewGroup中的位置
3. 绘制——`onDraw()`：绘制这个View

## 自定义View

### 分类

* 继承View，重写`onDraw()`方法
* 继承ViewGroup，派生特殊的Layout
* 继承特定的View，例如TextView
* 继承特定的ViewGroup，例如LinearLayout

### 实现步骤

* 继承View类或者其子类
* 重写View中的一些函数
* 为自定义View类增加属性（两种方式）
* 绘制控件（导入布局）
* 响应用户事件
* 定义回调函数

## View的滑动方式

### 通过View本身提供的`scrollTo`/`scrollBy`方法

这个方法移动的是View的内容，而View本身不移动。

`scrollTo`和`scrollBy`也是有区别的。`scrollBy`内部调用了`scrollTo`，它是基于当前位置的**相对滑动**；而`scrollTo`是**绝对滑动**，因此如果利用相同输入参数多次调用`scrollTo()`方法，由于View初始位置是不变的，只会出现一次View滚动的效果而不是多次的。

### 通过动画给View施加平移效果实现滑动

只是通过动画的方式移动View的影像，然而View本身位置不发生改变

### 通过改变View的LayoutParams使View重新布局实现滑动

```Java
MarginLayoutParams params = mButton.getLayoutParams();
params.width += 10;
params.height += 10;
mButton.requestLayout();
mButton.setLayoutParams(params);
```

### 三种方法的使用对比

* `scrollTo`/`scrollBy`：操作简单，适合对View内容的滑动；
* 动画：操作简单，主要适合于没有交互的View和实现复杂的动画效果；
* 改变布局参数：操作稍微复杂，适合有交互的View

### 如何解决View的滑动冲突

首先判断是什么原因引起的View滑动冲突。

* 对于由于外部滑动和内部滑动**方向不一致**导致的滑动冲突，可以根据滑动的方向判断谁来拦截事件；
* 对于由于外部滑动方向和内部滑动**方向一致**导致的滑动冲突，可以根据业务需求，规定何时让外部View拦截事件何时让内部View拦截事件；
* 上面两种情况的嵌套。

* **外部拦截法**：时间都先经过父容器的拦截处理，如果父容器需要此事件就拦截，否则就不拦截；具体方法需要重写父容器的`onInterceptTouchEvent`方法，在内部做出相应的拦截；
* **内部拦截法**：父容器不拦截任何事件，而将所有的事件都传递给子容器，如果子容器需要此事件就直接消耗，否则就交由父容器进行处理。具体方法是配合`requestDisallowInterceptTouchEvent`方法。

## View的事件分发机制

当我们点击屏幕时，产生了点击事件，这个事件被封装成类：`MotionEvent`。

事件的分发机制由三个重要想法来共同完成：`dispatchTouchEvent`、`onInterceptTouchEvent`、`onTouchEvent`。

* **事件分发**：`public boolean dispatchTouchEvent(MotionEvent event)`

    用来进行事件的**分发（传递）**。如果事件能够传递给当前View，那么此方法一定会被调用，返回结果受当前的`onTouchEvent`和下级View的`dispatchTouchEvent`影响，表示是否消耗了当前事件；

* **事件拦截**：`public boolean onInterceptTouchEvent(MotionEvent event)`

    用来判断是否**拦截**某个事件，如果当前View拦截了某个事件，那么在同一个事件序列当中，此方法不会被再次调用，返回结果表示是否拦截当前事件；

* **事件响应**：`public boolean onTouchEvent(MotionEvent event)`

    在`dispatchTouchEvent`方法中调用，用来处理点击事件，返回结果表示是否消耗当前事件。

**三者的关系可以用以下伪代码表示**：
```Java
public boolean dispatchTouchEvent(MotionEvent event) {
    boolean result = false;
    if (onInterceptTouchEvent(event)) {
        result = onTouchEvent(event);
    } else {
        result = child.dispatchTouchEvent(event);
    }

    return consume;
}

`onInterceptTouchEvent()`和`onTouchEvent()`方法都是在`dispatchTouchEvent()`方法里调用。
```

## View的工作原理

View的工作流程就是先measure测量，用于确定View的宽高，再layout布局，用于确定View的最终宽高和四个顶点的位置，最后使用draw绘制，用于将View绘制到屏幕上。

measure用来测量view的宽和高，layout方法的作用是确定元素的位置，draw的过程则有：

* 如果需要，则绘制背景；
* 保存当前canvas层；
* 绘制view的内容；
* 绘制子view；
* 如果需要，绘制view的褪色边缘，类似于阴影效果；
* 绘制装饰，比如滚动条里；

## View和ViewGroup的区别

## 非UI线程可以更新UI吗

其实是非UI线程是可以刷新UI的。前提是**它要拥有自己的ViewRoot，即更新UI的线程和创建ViewRoot的线程是同一个**，或者**在执行`checkThread()`方法之前去更新UI**。

因为在访问UI时，ViewRootImpl会调用`checkThread()`方法去检查当前访问UI的线程是哪一个，如果不会UI线程就会抛出异常。

```Java
void checkThread() {
    if (mThread != Thread.currentThread()) {
        throw new CalledFromWrongThreadException (
            "Only the original thread that created a view hierarchy can touch its views."
        )
    }
}
```

ViewRootImpl的创建是在`onResume()`方法回调之后，而在执行`onCreate()`方法的时候还没有创建ViewRootImpl，就无法去检查当前线程。但是一般情况下，我们不会在`onCreate()`方法中做更新UI的操作。

## MotionEvent是什么？包含几种事件？什么时候会产生？ <Badge text="Uncompleted"/>