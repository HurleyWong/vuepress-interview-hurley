# Animation

## Android中有哪几种类型的动画

* **View动画（View Animation）/ 补间动画（Tween Animation）**：对View进行平移、缩放、旋转和透明度变化的动画，不能真正地改变View的位置
* **逐帧动画（Drawable Animation）**：是View动画的一种，它会按照顺序播放一组预先定义好的图片
* **属性动画（Property Animation）**：通过不断的改变View的属性，不断地重绘而形成动画效果

## View动画和属性动画的区别

|         | View动画 | 属性动画 |
| :-----: | :-------------: | :----: |
| 动画实现 | 通过不断的**图形变换**（TranslateAnimation，ScaleAnimation，RotateAnimation，AlphaAnimation） | 通过动态改变**对象属性**（ValueAnimator，ObjectAnimator，AnimatorSet） |
| 作用对象 |       View对象        |   任何对象   |
| 存放位置 |       `res/anim/`    |   `res/animator/`   |
| 状态变化 |       未真正改变view的位置   |   真正地改变了view的位置   |

> View动画改变的只是View的显示，而没有改变View的响应区域；而属性动画会通过反射技术来获取和执行属性的`get`、`set`方法，从而改变了对象位置的属性值。

## 帧动画在使用时需要注意到什么

使用帧动画时注意不能使用尺寸过大的图片，否则容易造成OOM。

## 属性动画中插值器和估值器的作用

### 插值器（Interpoloator）

* 定义：一个接口
* 作用：设置属性值从初始值过渡到结束值的**变化规律**（确定了动画效果变化的模式，如匀速变化、加速变化、减速变化等）
* 使用方法：可以在XML和Java代码中设置

### 估值器（TypeEvaluator）

* 定义：一个接口
* 作用：设置属性值从初始值过渡到结束值的**变化具体数值**（估值器决定了具体的变化数值）