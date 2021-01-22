# Medium

## 2. Add Two Numbers

> **两树相加**
>
> You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order** and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.
>
> You may assume the two numbers do not contain any leading zero, except the number 0 itself.

<!-- more -->

### 知识点

这道题主要考察了两个知识点。第一个就是**链表**，链表的遍历和链表的创建。第二个就是高精度加法的模拟，因为题目中数字的长度**其实可以很长**。

### 方法：初等数学

用初等数学的方法，相当于进行**加法**的计算。

上图的carry=1的意思是，前一位4+6=10进了1位，所以进位让carry从默认值0变为1。然后3+4+1=8。

#### 图解（转载至LeetCode：灵魂画师牧码）

![](https://s3.ax1x.com/2021/01/07/seTzQK.png)

![](https://s3.ax1x.com/2021/01/07/se7SsO.png)

![](https://s3.ax1x.com/2021/01/07/seTvz6.png)

![](https://s3.ax1x.com/2021/01/07/seTjRx.png)

![](https://s3.ax1x.com/2021/01/07/seTXJ1.png)

![](https://s3.ax1x.com/2021/01/07/se7pLD.png)

![](https://s3.ax1x.com/2021/01/07/se7Cee.png)

![](https://s3.ax1x.com/2021/01/07/se7PdH.png)

#### 伪代码

* 将进位值carry设置为0
* 将p和q分别初始化为$l_1$和$l_2$的头部
* 遍历$l_1$和$l_2$直至到达它们的尾端
  * 将x设置为结点p的值。如果p已经到达$l_1$的末尾，则将其值设置为0
  * 将y设置为结点q的值。如果q已经到达$l_2$的末尾，则将其值设置为0
  * 设定sum=x+y+carry
  * carry=sum/10，将carry取整。这里的carry要么为0，要么为1
  * 创建一个数值为(sum mod 10)的新结点（mod为求余数），将其设置为当前结点的下一个结点，然后将当前结点前进到下一个结点
  * 同时，将p和q前进到下一个结点
* 检查carry=1是否成立（可以通过判断carry是否大于0），如果成立，则追加一个为1的新结点

```
dummy = tail = ListNode(0)
while l1 or l2 or carry:
	sum = l1?.val + l2?.val + carry
	tail.next = ListNode(sum % 10)
	tail = tail.next
	carry = sum /= 10
	l1, l2 = l1?.next, l2?.next
return dummy.next

Time complexity: O(max(n,m))
Space complexity: O(max(n,m))
```

#### 代码

```kotlin
package medium._002

/**
 * You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.
 *
 * You may assume the two numbers do not contain any leading zero, except the number 0 itself.
 *
 * Example:
 *
 * Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
 * Output: 7 -> 0 -> 8
 * Explanation: 342 + 465 = 807.
 */

fun addTwoNumbers(l1: ListNode?, l2: ListNode?): ListNode? {
    val head = ListNode(0)
    var p = l1
    var q = l2
    var curr: ListNode? = head
    // 进位carry初始化为0
    var carry = 0
    while (p != null || q != null) {
        // 如果p不为空，将x设为结点p的值；如果p已到达l1的末尾，则p=null，则x=0
        val x = p?.`val` ?: 0
        // q同理
        val y = q?.`val` ?: 0
        val sum = x + y + carry
        // 将carry取整
        carry = sum / 10
        curr!!.next = ListNode(sum % 10)
        curr = curr.next
        if (p != null) {
            p = p.next
        }
        if (q != null) {
            q = q.next
        }
    }
    // 检查carry是否等于1
    if (carry > 0) {
        curr!!.next = ListNode(carry)
    }
    return head.next
}

/**
 * 打印链表
 * @param last
 */
fun printList(last: ListNode?) {
    var last = last
    while (last != null) {
        // 如果是最后一位，则不输出逗号，
        if (last.next == null) {
            print(last.`val`)
        } else {
            // 如果不是最后，则输入逗号，分隔
            print(last.`val`.toString() + ",")
        }
        last = last.next
    }
}

fun main() {
    // 原测试用例：l1=[2,4,3]，l2=[5,6,4]，输出结果为[7,0,8]
    val l1 = ListNode(2)
    l1.next = ListNode(4)
    l1.next!!.next = ListNode(3)
    val l2 = ListNode(5)
    l2.next = ListNode(6)
    l2.next!!.next = ListNode(4)
// 测试用例1：l1=[0,1]，l2=[0,1,2]，输出结果应为[0,2,2]
//        ListNode l1 = new ListNode(0);
//        l1.next = new ListNode(1);
//        ListNode l2 = new ListNode(0);
//        l2.next = new ListNode(1);
//        l2.next.next = new ListNode(2);
// 测试用例2：l1=[]，l2=[0,1]，输出结果为[0,1]
//        ListNode l1 = new ListNode();
//        ListNode l2 = new ListNode(0);
//        l2.next = new ListNode(1);
// 测试用例l3：l1=[9,9]，l2=[1]，输出结果为[0,0,1]
//        ListNode l1 = new ListNode(9);
//        l1.next = new ListNode(9);
//        ListNode l2 = new ListNode(1);
    printList(addTwoNumbers(l1, l2))
}


/**
 * ListNode是自己定义的Java中的链表对象
 * 类结构如下
 */
class ListNode {
    var `val`: Int
    var next: ListNode? = null

    constructor() {
        `val` = 0
    }

    constructor(i: Int) {
        `val` = i
    }

    fun `val`(): Int {
        return `val`
    }
}
```

#### 复杂度分析：

* **时间复杂度：**$O(max(m,n))$

  该算法使用了一次whlie循环，且判断条件是`p != null || q != null`。假设链表p和q的长度分别为m和n，则该循环最多重复$max(m,n)$次。

* **空间复杂度**：$O(max(m,n))$

  新链表的长度也同样取决于p和q的长度，但由于相加后有可能产生进位，所以长度可能加1。所以长度最多为$max(m,n)+1$。

  如果仅仅是把结果打印出来，那么空间复杂度就是$O(1)$，因为不需要额外的存储。

## 3. Longest Substring Without Repeating Characters

> **无重复字符的最长子串**
>
> Given a string, find the length of the **longest substring** without repeating characters.
>
> Example 1:
>
> ```
>Input: "abcabcbb"
> Output: 3
> Explanation: The answer is "abc", with the length of 3.
> ```
>
> Example 2:
>
> ```
>Input: "bbbbb"
> Output: 1
> Explanation: The answer is "b", with the length of 1.
> ```
>
> Example 3:
>
> ```
>Input: "pwwkew"
> Output: 3
> Explanation: The answer is "wke", with the length of 3. Note that the answer must be a substring, "pwke" is a subsequence and not a substring.
> ```

<!-- more -->

### 方法一：暴力法(Naive brute force)

可以使用暴力法逐个检查所有的子字符串，然后记录长度，最终选择长度最大的。

因为字符长度为$n$的字符串，会有$n^2$个`subString`，然后检查每一个`subString`中是否含有重复字符又得遍历该`subString`,所以又需要$O(n)$，所以总的时间复杂度就是$O(n^3)$。

首先写一个对获得不重复子字符串的方法。定义一个HashSet，然后对字符串进行遍历操作，如果HashSet中不含有该元素，就添加到HashSet中；如果有，就返回false。

然后使用两层循环，去判断是否是不重复子串并记录长度。假设开始和结束的索引分别为i和j，那么就使用i从0~n-1以及j从i+1~n这两个嵌套的循环，就可以枚举出所有的子字符串。

```kotlin
/**
 * 1.暴力法
 * 返回最长子穿的长度
 */
fun lengthOfLongestSubstring(s: String): Int {
    // n是字符串的长度
    val n = s.length
    var ans = 0
    for (i in 0 until n) {
        for (j in i + 1 until n) {
            if (allUnique(s, i, j)) {
                ans = Math.max(ans, j - i)
            }
        }
    }
    return ans
}

fun allUnique(s: String, start: Int, end: Int): Boolean {
    val hashSet: HashSet<Char> = HashSet();
    for (i in start until end) {
        val ch = s[i]
        // 如果HashSet中含有该元素，就返回false
        if (hashSet.contains(ch)) {
            return false
        }
        // 如果HashSet中不含有该元素，就添加到这个HashSet中
        hashSet.add(ch)
    }
    return true
}
```

#### 复杂度分析：

* **时间复杂度：**$O(n^3)$

  这里使用了三层循环，遍历了三次字符串。所以时间复杂度显然是$O(n^3)$。

* **空间复杂度：**$O(k)$

  因为需要$O(k)$的空间来检查子字符串中是否有重复字符，其中k表示的是HashSet的大小。

但暴力法的效率实在太低，当长度过长时可能会出现**TLE**(Time Limit Exceeded)。不推荐使用。

### 方法二：滑动窗口(Sliding Window)

在暴力法中，枚举出所有子字符串之后，第3步要**从首到尾的元素**去检查每一个子字符串是否有重复元素。

但其实没有必要遍历一个子字符串的所有元素。

例如：字符串qwekq，子字符串qwe、qwek等。

如果子字符串qwe已经检查过是没有重复元素的，那么在检查qwek时，就没有必要从头到尾，将qwe之间再检查一遍。只需要检查新添加的元素k是否与之前的字符串有重复元素即可。

即，**如果从索引i到j-1之间的子字符串$S_{ij}$已经被检查为没有重复字符，只需要检查$S[j]$对应的字符是否已经存在于子字符串$S_{ij}$中。**

**窗口**通常是在数组/字符串中由开始和结束索引定义的一系列元素的集合，即$[i,j)$。滑动窗口是可以将两个边界向某一方向**“滑动”**的窗口。滑动窗口通常用来求解数组和`String`。

例如：将$[i,j)$向右滑动1个元素$\Rightarrow[i+1,j+1)$

所以，这题可以使用HashSet将字符存储在当前窗口$[i,j)$（最初j=i）中，然后向右滑动索引j，如果它不在HashSet中，继续滑动j，直到$S[j]$已经存在于HashSet中。

#### 例子

一个字符串abcb，求最大子串。

n等于字符串长度等于4，然后令ans=0，i=0，j=0。

1. 因为初始的HashSet为空，所以肯定不含有$S[j]$即$S[0]$。所以把$S[0]$添加到HashSet中，然后j++。这时候ans=max(0, j-i)=max(0,1)=1。Set中有[a]。
2. $S[1]$为b，HashSet不含有，则把$S[1]$添加到HashSet中，然后j++。这时候ans=max(1,j-i)=max(1,2-0)=2。Set中有[a,b]。
3. $S[2]$为c，HashSet中没有，则把$S[2]$添加到HashSet中，然后j++。这时候ans=max(2,3-0)=3。Set为[a,b,c]。
4. $S[3]$为b，HashSet中已经含有b，因此`set.remove(s[0])`，然后i++。即把HashSet的第一个元素a去掉，这时候Set为[b,c]。
5. 接着进行判断，$S[3]$是b，HashSet中仍然含有b，所以`set.remove(s[1])`，然后i++。这样就是把HashSet的第二个元素b去掉了。
6. 接着判断，$S[3]$是b，这时候HashSet已经不包含b了。所以把b添加到Set中，然后j++。这时候j=4，已经不能再进行下一次循环了。这时候的Set是[c,b]，ans=max(3, 4-2)=3。
7. 所以最终得到的最长子串的长度是3。

```kotlin
/**
 * 2.滑动窗口
 * 返回最长子串的长度
 */
fun lengthOfLongestSubstring2(s: String): Int {
    val n = s.length
    val set: HashSet<Char> = HashSet()
    // 默认长度为0，i和j从0开始向右移
    var ans = 0
    var i = 0
    var j = 0
    while (i < n && j < n) {
        if (!set.contains(s[j])) {
            set.add(s[j++])
            print(set)
            ans = Math.max(ans, j - i)
        } else {
            set.remove(s[i++])
        }
    }
    return ans
}
```

#### 复杂度分析：

* **时间复杂度：**$O(n)=O(2n)$

  可以从代码中看出，使用while进行了一次遍历，长度是n。但是因为条件是`i < n && j < n`，所以最坏的情况下可能判断了两遍n，即从i遍历到n和由j遍历到n。所以最坏情况的时间复杂度是$O(2n)$。

* **空间复杂度**：$O(k)$

  滑动窗口法仍然需要$O(k)$的空间，其中k的表示Set的大小。

### 方法三：优化的滑动窗口

从方法二的例子的步骤分析上就可以看出，**步骤4-6**其实有一些冗余。当发现$S[j]$在$[i,j)$范围有重复字符时，不需要让i=0开始，使用i++逐步增加i，可以直接跳过$[i,j']$范围内的所有元素，并将i变成j'+1。

#### 图解（转载至LeetCode：灵魂画师牧码）

![](https://s3.ax1x.com/2021/01/07/se7c6K.png)

![](https://s3.ax1x.com/2021/01/07/se76l6.png)

![](https://s3.ax1x.com/2021/01/07/se7ySx.png)

![](https://s3.ax1x.com/2021/01/07/se7gOO.png)

![](https://s3.ax1x.com/2021/01/07/se7rf1.png)

![](https://s3.ax1x.com/2021/01/07/se7RmD.png)

![](https://s3.ax1x.com/2021/01/07/se7W0e.png)

```kotlin
fun lengthOfLongestSubstring3(s: String): Int {
    val n = s.length
    var ans = 0
    var i = 0
    var j = 0
    val map: HashMap<Char, Int> = HashMap()
    for (j in 0 until n) {
        if (map.containsKey(s[j])) {
            i = Math.max(map.getValue(s[j]), i)
        }
        ans = Math.max(ans, j - i + 1)
        map.put(s[j], j + 1)
    }
    return ans
}
```

#### 复杂度分析

* **时间复杂度：**$O(n)$

  可以很明显看到，j由0遍历到n，循环了n次。

* **空间复杂度：**$O(k)$

  滑动窗口法仍然需要$O(k)$的空间，其中k的表示Set的大小。

## 148. Sort List

> 给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。
>
> 进阶：
>
> 你可以在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序吗？

### 思路

具体思路是：

* 定义一个辅助节点aux，永远指向链表头结点，即aux.next=head;
* 定义当前节点cur和它的上一个节点pre，如果`pre.next<=cur.next`,那么pre节点和cur节点同时向后移动
* 如果`pre.next>cur.next`，切断pre节点和cur节点的引用关系，令`pre.next=cur.next`，把cur节点插入前面恰当位置
* 定义节点`node1=aux`和`node2=aux.next`，同时向后移动node1和node2，当出现`cur.val<node2.val`时，把cur插入node1和node2之间
* `cur节点变为pre.next`

### 代码

```Java
public static Node sortLinkedList(Node head) {
    if (head == null || head.next == null) {
        return head;
    }
    // 头节点
    Node pre = head;
    Node cur = head.next;
    // 辅助节点
    Node aux = new Node(0);
    // 辅助节点永远指向头节点
    aux.next = head;
    while (cur != null) {
        // 如果cur节点的值比前一节点的值小
        if (cur.val < pre.val) {
            // 前一节点直接跳过cur，指向cur的后一节点
            pre.next = cur.next;
            Node node1 = aux;
            Node node2 = aux.next;
            // 遍历，找到一个节点的值要比cur更小的节点
            while (cur.val > node2.val) {
                node1 = node2;
                node2 = node2.next;
            }
            // 找到后，就将这两个值排序
            node1.next = cur;
            cur.next = node2;
            cur = pre.next;
        } else {
            // 往后移动，接着查找
            pre = cur;
            cur = cur.next;
        }
    }
    return aux.next;
}
```

## 437. Path Sum III

> **路径总和III**
>
> You are given a binary tree in which each node contains an integer value.
>
> Find the number of paths that sum to a given value.
>
> The path does not need to start or end at the root or a leaf, but it must go downwards (traveling only from parent nodes to child nodes).
>
> The tree has no more than 1,000 nodes and the values are in the range -1,000,000 to 1,000,000.
>
> <!-- more -->
>
> **Example:**
>
> ```
> root = [10,5,-3,3,2,null,11,3,-2,null,1], sum = 8
> 
> 10
> /  \
> 5   -3
> / \    \
> 3   2   11
> / \   \
> 3  -2   1
> 
> Return 3. The paths that sum to 8 are:
> 
> 1.  5 -> 3
> 2.  5 -> 2 -> 1
> 3. -3 -> 11
> ```

### 思路

这道题的描述中没有要求路径的开头必须是根节点，结尾也没有要求是叶子节点，只要求了是从上往下。

所以，所有情况就分为以根节点开始的，和以根节点的左孩子和右孩子开始这三种。

具体过程同样是采取了递归的思想，当找到一条值等于sum，就让路径树加1。但需要注意的是递归的循环中，应该是`pathSum(root.left/right, sum - root.val)`这种形式。因为在递归后，后面一个参数应该从`sum`变成`sum - root.val`，因为已经经过了一个节点，需要减去这个节点的值再进行递归。

### 代码

```java
public class Path_Sum_3 {

    public int pathSum(TreeNode root, int sum) {
        if (root == null) {
            return 0;
        }
        // 找出根节点的所有路径，再找出以根节点的左孩子和右孩子开始的所有路径
        return path(root, sum) + pathSum(root.left, sum) + pathSum(root.right, sum);
    }

    public int path(TreeNode root, int sum) {

        int pathSum = 0;
        if (root == null) {
            return 0;
        }
        if (root.val == sum) {
            pathSum++;
        }

        pathSum = pathSum + path(root.left, sum - root.val);
        pathSum = pathSum + path(root.right, sum - root.val);

        return pathSum;

    }

    class TreeNode {
        int val;
        TreeNode left;
        TreeNode right;

        TreeNode(int x) {
            val = x;
        }
    }

}
```

这里刚开始有些疑惑的是为什么一个方法的返回值是`return path(root, sum) + pathSum(root.left, sum) + pathSum(root.right, sum);`，而不是都调用`path`函数。

我认为实际上这是把`path(root, sum) + pathSum(root.left, sum) + pathSum(root.right, sum)`看成一个整体，分别是根节点root和它的左孩子A和右孩子B。第一个`path(root, sum)`是为了找出以根节点为路径开头的路径数量，第二个`pathSum(root.left, sum)`就是以左孩子节点作为新的根节点，然后递归，又以这个A作为根节点，找出它作为路径开头的路径数量，依次递归下去。右孩子B同理。

但是细想起来，这个做法存在着大量的重复计算，其实在效率上还是可以改进的。因为比如第一步，以根节点root作为路径的开头，去遍历可能值等于sum的路径，这时候就已经遍历过一次了，如果在这个遍历的过程中，能够发现路径中的某一部分（即不以根节点作为开头）的值正好等于sum，就明显提高了效率。

## 547. Find Circle Num

> **朋友圈**
> 班上有 N 名学生。其中有些人是朋友，有些则不是。他们的友谊具有是传递性。如果已知 A 是 B 的朋友，B 是 C 的朋友，那么我们可以认为 A 也是 C 的朋友。所谓的朋友圈，是指所有朋友的集合。
> 
> 给定一个 N * N 的矩阵 M，表示班级中学生之间的朋友关系。如果M[i][j] = 1，表示已知第 i 个和 j 个学生互为朋友关系，否则为不知道。你必须输出所有学生中的已知的朋友圈总数。
> 
> 示例 1：
> 
> 输入：
> [[1,1,0],
>  [1,1,0],
>  [0,0,1]]
> 
> 输出：2 
>
> 解释：已知学生 0 和学生 1 互为朋友，他们在一个朋友圈。
> 第2个学生自己在一个朋友圈。所以返回 2 。
> 
> 示例 2：
> 
> 输入：
> [[1,1,0],
>  [1,1,1],
>  [0,1,1]]
> 
> 输出：1
> 
> 解释：已知学生 0 和学生 1 互为朋友，学生 1 和学生 2 互为朋友，所以学生 0 和学生 2 也是朋友，所以他们三个在一个朋友圈，返回 1 。
> 
> 提示：
> 
> 1 <= N <= 200
> 
> M[I][I] == 1
> 
> M[I][j] == M[j][I]

### 深度优先遍历

可以用邻接矩阵的方式将其看成是一个图，所以其实就是寻找连通顶点的个数。

通过创建一个大小等于邻接矩阵大小的visited数组，例如$M=N*N$，`visited[i]`用来存储第i个元素是否被深度优先遍历搜索过。

我们首先选择一个节点，访问任一相邻的节点。然后再访问这一节点的任一相邻节点。这样不断遍历到没有未访问的相邻节点时，回溯到之前的节点进行访问。

```Java
public int findCircleNum(int[][] M) {
    // 创建一个长度大小为M的visited数组
    int[] visited = new int[M.length];
    int count = 0;
    for (int i = 0; i < M.length; i++) {
        if (visited[i] == 0) {
            dfs(M, visited, i);
            count++;
        }
    }
    return count;
}

public void dfs(int[][] M, int[] visited, int i) {
    for (int j = 0; j < M.length; j++) {
        // 当M[i][j]==1说明有朋友圈，并且如果visited数组元素为0时，说明未被遍历过
        if (M[i][j] == 1 && visited[j] == 0) {
            // 令visited元素为1
            visited[j] = 1;
            // 继续深度遍历
            dfs(M, visited, j);
        }
    }
}
```

#### 复杂度分析

* **时间复杂度**：因为要遍历整个矩阵的每一个元素，所以是$O(n^2)$
* **空间复杂度**：创建了一个visited数组来存储元素，所以是$O(n)$

### 广度优先遍历

如果把矩阵看成的图的邻接矩阵，就是计算连通块的个数。那么，可以用到图中的**广度优先搜索**。

在广度优先搜索中，从一个特定点开始，访问所有邻接的节点。然后对于这些邻接节点，我们依然通过访问邻接节点的方式，直到访问所有可以到达的节点。因此，我们按照一层一层的方式访问节点。

```Java
public int findCircleNum(int[][] M) {
    int[] visited = new int[M.length];
    int count = 0;
    // 创建一个队列
    Queue<Integer> queue = new LinkedList<>();
    for (int i = 0; i < M.length; i++) {
        if (visited[i] == 0) {
            queue.add(i);
            // 如果队列不为空
            while (!queue.isEmpty()) {
                int s = queue.remove();
                visited[s] = 1;
                for (int j = 0; j < M.length; j++) {
                    if (M[s][j] == 1 && visited[j] == 0)
                        queue.add(j);
                }
            }
            count++;
        }
    }
    return count;
}
```

### 并查集

## 785. Is Graph Bipartite

> **判断二分图**
>
> Given an undirected `graph`, return `true` if and only if it is bipartite.
>
> Recall that a graph is *bipartite* if we can split it's set of nodes into two independent subsets A and B such that every edge in the graph has one node in A and another node in B.
>
> The graph is given in the following form: `graph[i]` is a list of indexes `j` for which the edge between nodes `i` and `j` exists. Each node is an integer between `0` and `graph.length - 1`. There are no self edges or parallel edges: `graph[i]` does not contain `i`, and it doesn't contain any element twice.

<!-- more -->

这其实可以看做是一个着色问题，即可以转化为「**如果这个图中每个相邻的节点间的颜色都是不一样的，那么就是二分图**」。

### 邻接表表示矩阵

因为LeetCode上图的画法问题，导致我一开始没有看懂这个图是什么形状，是怎么用邻接表形式表示的。

```code
示例 1:
输入: [[1,3], [0,2], [1,3], [0,2]]
输出: true
解释: 
无向图如下:
0----1
|    |
|    |
3----2
我们可以将节点分成两组: {0, 2} 和 {1, 3}。

示例 2:
输入: [[1,2,3], [0,2], [0,1,3], [0,2]]
输出: false
解释: 
无向图如下:
0----1
| \  |
|  \ |
3----2
我们不能将节点分割成两个独立的子集。
```

如上所示，如果输入`[[1,3], [0,2], [1,3], [0,2]]`，那么这个邻接表表示的是图的节点有`1->3,0->2`，因此画出的图其实是如下所示：

<img src="https://raw.githubusercontent.com/HurleyJames/ImageHosting/master/IMG_9C75CB36F198-1.jpeg" style="zoom:50%;" />

同理，如果输入`[[1,2,3], [0,2], [0,1,3], [0,2]]`，那么说明`1->2,1->3,0->2,0->1,0->3`，所以图如下所示：

<img src="https://raw.githubusercontent.com/HurleyJames/ImageHosting/master/IMG_FB44338948F8-1.jpeg" style="zoom:50%;" />

### 方法：DFS搜索着色

如果节点属于第一个集合，将其设置为颜色0，否则为颜色1。当这个图为二分图时，就可以使用**贪心思想**给图着色：比如一个节点的颜色为0，则其所有的邻接点的颜色为1，其所有的邻接点的邻接点的颜色为0，以此类推。

先找到一个未着色的节点$u$，把它染上一种颜色，比如颜色1黑色，然后遍历所有与它相连的节点$v$，如果节点$v$已经被染色并且颜色和$u$是一样的，那么就不是二分图。如果这个节点$v$没有被染色，则先把它染成与节点$u$不同的颜色，例如颜色2红色，然后再遍历所有节点$v$的邻接点，依次递推。

可以使用数组或者哈希表来记录每个节点的颜色：`colors[node]`。颜色有两种，分别为1黑色和2红色，0表示未着色。

#### 代码

```java
public class Is_Graph_Bipartite {

    public static boolean isBipartite(int[][] graph) {
        if (graph == null || graph.length == 0) {
            return false;
        }
        int n = graph.length;
        // 设置 color 数组，0 表示未着色，1 黑，2 红
        int[] colors = new int[n];
        // Arrays.fill 方法将 color 数组中的所有元素的值设置为 0，表示未着色
        Arrays.fill(colors, 0);
        for (int i = 0; i < n; i++) {
            if (!dfs(graph, i, colors, 0)) {
                return false;
            }
        }

        return true;
    }

    private static boolean dfs(int[][] graph, int i, int[] colors, int preColor) {
        // 如果未被染色
        if (colors[i] == 0) {
            // 与相邻节点进行相反的染色
            colors[i] = (preColor == 1) ? 2 : 1;
            for (int j = 0; j < graph[i].length; j++) {
                // 如果不能够再往下递推
                if (!dfs(graph, graph[i][j], colors, colors[i])) {
                    return false;
                }
            }
            return true;
        } else {
            // 已染色
            // 如果颜色和邻接点颜色一致
            if (colors[i] == preColor) {
                return false;
            } else {
                return true;
            }
        }
    }
}
```