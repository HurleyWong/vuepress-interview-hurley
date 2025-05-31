# Layout

## 六大布局

* LinearLayout
* RelativeLayout
* TableLayout
* FrameLayout
* AbsoluteLayout
* GridLayout

### margin和padding的区别 <Badge text="Uncompleted"/>

## ConstraintLayout

ConstrainLayout约束布局和RelativeLayout相对布局有点类似控件之间都是依赖关系而存在的，但是会比RelativeLayout更加灵活。

它的好处就是提升了性能，减少了布局之间的嵌套。

### ConstraintLayout与RelativeLayout的区别

## RecyclerView

* LayoutManager：负责Item视图的布局的显示管理
* ItemDecoration：给每一个item视图添加子View（例如可以添加分割线）
* ItemAnimator：负责处理数据添加或者删除时的动画效果
* Adapter：为每一项item创建视图。一是根据不同的ViewType创建与之相应的item布局，二是访问数据集合并将数据绑定到正确的View上
* ViewHolder：承载item视图的子布局
* Recycler：负责处理View的缓存

**方法的作用**：

```Java
// 创建Item视图，并返回给相应的ViewHolder
public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType)

// 绑定数据到正确的Item视图上
public void onBindViewHolder(ViewHolder holder, int position)

// 返回该Adapter所持有的Item数量
public int getItemCount()

// 用来获取当前项Item，即position参数是哪种类型的布局
public int getItemViewType(int position)
```

### RecyclerView与ListView的区别

1. 缓存机制不同

    ListView是两级缓存，而RecyclerView是四级缓存，支持多个ItemView缓存，支持自定义缓存处理逻辑，支持所有的RecyclerView共用同一个RecyclerViewPool。

    ListView的两级缓存是`mActiveViews`和`mScrapViews`。

    RecyclerView的四级缓存是`mAttachedScrap`和`mCacheViews`和`mViewCatchExtension`和`mRecyclerPool`。

2. 局部刷新

    RecyclerView提供了局部刷新的接口，通过局部刷新的机制，可以避免调用许多无用的bindView。

3. ListView不强制要写ViewHolder，而RecyclerView是强制要写ViewHolder的，从而去重写`getItemCount()`、`onCreateViewHolder()`、`onBindViewHolder()`三个方法

4. ListView的分割线是直接设置Divider，而RecyclerView是不支持直接在布局中添加分割线的

5. ListView支持点击事件，而RecyclerView不支持点击事件，只有设置回调接口来设置点击事件。

6. ListView的布局效果单一，只能是纵向效果；RecyclerView布局效果丰富，通过LayoutManager中设置，可以实现线性布局（横向、纵向），表格布局，瀑布流布局等等。

### 如何理解adapter订阅者模式 <Badge text="Uncompleted"/>

### ViewHolder的作用

ViewHolder内部是存储一些子View，避免时间代价很大的findViewById的操作。

### 如何理解ViewHolder的复用

在重写RecyclerView.Adapter的时候，需要重写两个方法：

* `onCreateViewHolder()`
* `onBindViewHolder()`

它的复用机制就是当创建了足够多的ViewHolder对象之后，无论怎么滑动，都只需要复用以前创建的对象即可。

当数量足够用的时候，会停止调用`onCreateViewHolder()`方法，但是`onBindViewHolder()`方法会每次都会调用。

---

RecyclerView的复用机制的调用入口是`getViewPosition()`方法，重点则是在`tryGetViewHolderForPositionByDeadline()`方法之中。

它的关键步骤主要如下：

* 判断Cache池中是否有相应的ViewHolder对象
* 从`mViewCacheExtension`中寻找对象
* 从`RecyclerViewPool`中寻找对象
* 如果之前的步骤都没有寻找到对象，那么就用Adapter的`createViewHolder()`方法去创建ViewHolder对象
* 最后是根据不同的`ViewHolderFlags`情况（例如是否可复用等）来决定是否执行`tryBindViewHolderByDeadline()`方法，`onBindViewHolder()`方法是唯一的入口。

### 什么时候停止调用onCreateViewHolder <Badge text="Uncompleted"/>

### LayoutManager的作用是什么

LayoutManager的作用是用来设置item的位置，并且负责决定何时回收和复用item。一个RecyclerView如果想展示内容，就必须设置LayoutManager。

### LayoutManager的样式有哪些

* LinearLayoutManager：设置水平或者垂直的item视图
* GridLayoutManager：网格状的item视图
* StaggeredGridLayoutManager：交错的网格布局

### 上拉加载的功能是如何做的 <Badge text="Uncompleted"/>

### 添加滚动监听事件需要注意什么 <Badge text="Uncompleted"/>

### 网格布局上拉加载如何优化 <Badge text="Uncompleted"/>

### 如何理解RecyclerView三级缓存是如何实现的

#### 一级缓存 <Badge text="Uncompleted"/>

> 返回布局和内容都有效的ViewHolder

1. 按position或者id匹配
2. 命中一级缓存是无需使用`onCreateViewHolder`和`onBindViewHolder`
3. 

### RecyclerView滑动卡顿的原因有哪些？如何解决？ <Badge text="Uncompleted"/>

### RecyclerView常见的优化有哪些？ <Badge text="Uncompleted"/>