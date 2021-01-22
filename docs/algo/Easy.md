# Easy

[[TOC]]

## 1. Two Sum

> **两树之和**
>
> Give an array of integers, return indices of the two numbers such that they add up to a specific target.
>
> You may assume that each input would have exactly one solution, and you may not use the same element twice.
>
> Example:
>
> Given nums = [2, 7, 11, 15], target = 9,
>
> Because nums[0] + nums[1] = 2 + 7 = 9,
>
> return [0, 1].

<!-- more -->

### 方法一：暴力法

暴力法就是遍历每个元素x，并查找是否存在一个值与target-x相等的目标元素。

```java
public static int[] twoSum1(int[] nums, int target) {
    for (int i = 0; i < nums.length; i++) {
        for (int j = 0; j <= i; j++) {
            if (i != j && (nums[i] + nums[j] == target)) {
                System.out.println("Two numbers: " + nums[j] + " and " + nums[i]);
                System.out.println("Indices of the two numbers: " + j + " and " + i);
                return nums;
            }
        }
    }
    throw new IllegalArgumentException("No two sum solution");
}
```

#### 复杂度分析：

* **时间复杂度：**$O(n^2)$

  对于每个元素，通过遍历数组的其余部分来寻找它所对应的目标元素，这将耗费$O(n)$的时间。所以两个循环遍历的时间复杂度为$O(n^2)$。

* **空间复杂度：**$O(1)$。

### 方法二：两遍哈希表

因为该题是检查数组中是否存在目标元素满足条件。如果满足，则找出该目标元素的索引。所以可以使用**哈希表**来保持数组中的每个元素与其索引相互对应（键值对）。

使用两次迭代。在第一次迭代中，将每个元素的值和它的索引添加到表中。然后，在第二次迭代中，将检查每个元素所对应的目标元素(target-nums[i])是否存在于表中（该目标元素不能是nums[i]本身）。

```java
public static int[] twoSum2(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        map.put(nums[i], i);
    }
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement) && map.get(complement) != i) {
            System.out.println("Two numbers: " + nums[i] + " and " + complement);
            System.out.println("Indices of the two numbers: " + i + " and " + map.get(complement));
            return new int[]{i, map.get(complement)};
        }
    }
    throw new IllegalArgumentException("No two sum solution");
}
```

#### 复杂度分析：

* **时间复杂度：**$O(n)$

  从代码中可以看到，运行了两次```for (int i = 0; i < nums.length; i++)```代码，即将n个元素遍历的两次。但是因为哈希表将查找的时间降低到$O(1)$，所以时间复杂度是$O(n)$。

* **空间复杂度：**$O(n)$

  所需的空间是因为定义了一个哈希表存储数组的元素及其索引。所以空间大小取决于哈希表中存储的元素数量，即n个元素。所以是$O(n)$。

### 方法三：一遍哈希表

观察方法二的代码，发现其实运行了两遍```for (int i = 0; i < nums.length; i++)```代码，所以其实可以一次就完成。

首先创建一个map，然后在数组中进行循环，令complement=target-nums[i]。如果map中含有complement，就已找到目标元素。如果没有找到，那么就把这个元素的索引和值都添加到map中。

所以，其实一开始的时候是肯定找不到目标元素的，因为map中并没有蒜素。等到map中添加了两个元素和索引之后，map中就有可能含有正好等于差的complement了。

```java
public static int[] twoSum3(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement) && map.get(complement) != i) {
            System.out.println("Two numbers: " + complement + " and " + nums[i]);
            System.out.println("Indices of the two numbers: " + map.get(complement) + " and " + i);
            return new int[]{map.get(complement), i};
        }
        map.put(nums[i], i);
    }
    throw new IllegalArgumentException("No two sum solution");
}
```

#### 复杂度分析：

* **时间复杂度：**$O(n)$

  与方法二同理。

* **空间复杂度：**$O(n)$

  空间仍然是需要元素的数量n去用哈希表进行存储。

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

## 21. Merge Two Sorted Lists

> **合并两个有序链表**
>
> Merge two sorted linked lists and return it as a new list. The new list should be made by splicing together the nodes of the first two lists.
>
> **Example:**
>
> ```
> Input: 1->2->4, 1->3->4
> Output: 1->1->2->3->4->4
> ```

<!-- more -->

### 方法一：递归法

#### 思路

这道题的递归法同样不好理解。之前我一直认为递归是一个比较容易的方法，而迭代更难。看来面对不同的数据结构其实并不相同，树由于其特殊性，采用递归即深度遍历的方式是十分好理解的，而采用迭代则必须要用一个栈或者队列去保存元素反而更加繁琐。但是对于链表这种数据结构，递归反而值得更多的思考。

首先，这道题采用递归的终止条件是当`l1`或者`l2`为空时，结束。而返回值则是**每一层调用都返回排序好的链表头**。

通俗来说，就是如果`l1.val`比`l2.val`更小，那么就将`l1.next`与排序好的链表头相接；反之，如果`l2.val`更小，则将`l2.next`与排序号的链表头相连。具体是通过`l1.next = mergeTwoLists(l1.next, l2)`这句代码来实现的。

具体过程如下（但实际上仍然不是很好理解，具体还是要分析代码）：

![](https://s3.ax1x.com/2021/01/07/seHdjf.png)

![](https://s3.ax1x.com/2021/01/07/seH0u8.png)

![](https://s3.ax1x.com/2021/01/07/seHBDS.png)

通过以上图片过程可以发现，`l2.next = merge(l1, l2.next)`这句代码就是让原有的`l2.next`指向的那个链条断开，指向了新的`merge(l1, l2.next)`。虽然目前我们暂时不知道这个`merge(l1, l2.next)`是什么，但是这其实是一个持续递归的函数，最终会返回已经排序好的值。

#### 代码

```java
public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
    if (l1 == null && l2 == null) {
        return null;
    }
    if (l1 == null) {
        return l2;
    }
    if (l2 == null) {
        return l1;
    }

    if (l1.val < l2.val) {
        // 如果 l1 的 val 更小，则将 l1.next 等于排序好的链表头
        l1.next = mergeTwoLists(l1.next, l2);
        return l1;
    } else {
        // 如果 l2 的 val 更小，则将 l2.next 等于排序号的链表头
        l2.next = mergeTwoLists(l1, l2.next);
        return l2;
    }
}
```

我们通过一个例子来走一遍整个代码的流程。

##### 例子

现在有两个链表`l1`和`l2`，分别为`1->2->5`和`0->3->4`。

![](https://s3.ax1x.com/2021/01/07/seHagP.jpg)

![](https://s3.ax1x.com/2021/01/07/seHU3t.jpg)

##### 复杂度分析

* **时间复杂度**：很明显，这个过程要把两个链表都走一遍。假设它们的长长度分别为m和n，则时间复杂度为$O(m+n)$。
* **空间复杂度**：因为这个过程会调用$m+n$个栈，所以会消耗$O(m+n)$的空间。

### 方法二：迭代法

#### 思路

关于链表的合并问题，我们都可以想到去设置一个**哨兵节点**。比如，链表`l1`和`l2`分别为`1->2->4`和`1->3->4`，然后设置一个`prehead`的哨兵节点，如下所示：

![](https://s3.ax1x.com/2021/01/07/seHDHg.jpg)

然后我们主要关注`prehead`节点，调整它的`next`指针，让它总是指向`l1`和`l2`中较小的那个节点，直到两个链表中的某一条指向`null`为止。

我在这里把步骤一步一步地写出来：

![](https://s3.ax1x.com/2021/01/07/seHsEQ.jpg)

![](https://s3.ax1x.com/2021/01/07/seHyNj.jpg)

完整的过程如下：

![](https://s3.ax1x.com/2021/01/07/seH64s.jpg)

#### 代码

```java
public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
    // 2.迭代法
    ListNode prehead = new ListNode(-1);

    ListNode prev = prehead;
    while (l1 != null && l2 != null) {
        if (l1.val <= l2.val) {
            prev.next = l1;
            l1 = l1.next;
        } else {
            prev.next = l2;
            l2 = l2.next;
        }
        prev = prev.next;
    }

    if (l1 == null) {
        prev.next = l2;
    } else {
        prev.next = l1;
    }

    return prehead.next;
}
```

迭代法的算法看起来是十分清晰明了的，如果`l1.val <= l2.val`，则让哨兵节点指向`l1`即值更小的节点，反之一样，然后再将那个更小的节点往后走一位，再重新判断值的大小。

##### 复杂度分析

* **时间复杂度**：因为这个方法要比较两条链表的每一个节点，所以时间复杂度为$O(m+n)$，即循环的次数等于两个链表的总长度。
* **空间复杂度**：迭代的过程会产生几个指针，所以所需空间是常数级别的，为$O(1)$。

## 22. Generate Parenttheses

> 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且**有效的**括号组合。

假如输入n=3，结果会输出5，因为结果："((()))", "(())()", "(()())", "()(())", "()()()"。

即输入一个数，会返回所有可能的括号组合的数量。

通过观察，会有以下规律：

* 左括号的数量总是与右括号的数量相等
* 左括号总是位于右括号的左侧
* 必须要形成合理的包含关系

这里可以使用递归帮助解决问题。

```Java
static List<String> lists = new ArrayList<>();

public static void dfs(String str, List<String> lists, int left, int right) {
    if (left == 0 && right == 0) {
        lists.add(str);
        return ;
    }
    if (left > 0) {
        str = str + "(";
        dfs(str, lists, left - 1, right);
//            str = str.substring(0, str.length() - 1);
        System.out.println("字符串1：" + str);
    }
    if (right > left) {
        str = str + ")";
        dfs(str, lists, left, right - 1);
//            str = str.substring(0, str.length() - 1);
        System.out.println("字符串2：" + str);
    }
}
```

如果左括号大于0，则加上一个左括号，说明左括号有的多，然后数量减1。

如果右括号数量大于左括号，则说明右括号需要跟前面的左括号相匹配，则右括号数量减1。

当`left == 0 && right == 0`时，说明已经不剩下括号了，那么就将最后的字符串加入到list中。

例如，n=2，则排列出的组合有：

$$L\qquad R$$
$$\Downarrow$$
$$2\qquad2$$
$$\Downarrow$$
$$1\qquad2$$
$$\Downarrow$$
$$0\qquad2$$
$$\Downarrow$$
$$1\qquad1$$
$$\Downarrow$$
$$0\qquad1$$
$$\Downarrow$$
$$0\qquad0$$

## 100. Same Tree

> **相同的树**
>
> Given two binary trees, write a function to check if they are the same or not.
>
> Two binary trees are considered the same if they are structurally identical and the nodes have the same value.
>
> **Example 1:**
>
> ```
> Input:     1         1
>        / \       / \
>       2   3     2   3
>
>      [1,2,3],   [1,2,3]
>
> Output: true
> ```
>
> **Example 2:**
>
> ```
> Input:     1         1
>        /           \
>       2             2
>
>      [1,2],     [1,null,2]
>
> Output: false
> ```
>
> **Example 3:**
>
> ```
> Input:     1         1
>        / \       / \
>       2   1     1   2
>
>      [1,2,1],   [1,1,2]
>
> Output: false
> ```

<!-- more -->

### 思路

一棵树要么是空树，要么有两个指针，每个指针指向一颗树。树是一种递归结构，很多树的问题都可以使用递归来处理。

判断两个数是否是相同的树的终止条件时：

1. 当两颗数的节点都为`null`时，返回`true`
2. 当两棵树的节点一个为`null`一个不为`null`时，返回`false`
3. 当两个节点都不为`null`但是值不等时，返回`false`
4. 当两个节点都不为`null`且值相等时，递推判断接下来的节点，如果全部相同，则返回`true`

### 代码

```java
public class Same_Tree {

    public boolean isSameTree1(TreeNode p, TreeNode q) {
        if (p == null && q == null) {
            return true;
        }
        if (p == null || q == null) {
            return false;
        }
        if (p.val != q.val) {
            return false;
        }
        // 递推判断
        return isSameTree1(p.right, q.right) && isSameTree1(p.left, q.left);

    }

    // 定义树结构
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

#### 复杂度分析

* **时间复杂度：**$O(n)$，n为节点的数量，因为每个节点都要判断是否相同。
* **空间复杂度：**在最优情况下（完全平衡二叉树）时为$O(log(n))$，最坏情况下（完全不平衡二叉树）时为$O(n)$。

#### 完全二叉树和平衡二叉树

##### 完全二叉树

只有树最下面的两层的节点度小于2，并且最下面一层的节点都集中在该层的最左边的若干位置的二叉树。

![](https://s3.ax1x.com/2021/01/07/sebu5j.png)

##### 平衡二叉树

平衡二叉树是为了保证树不至于太倾斜。所以定义如下：

平衡二叉树要么是一颗空树，要么保证左右子树的高度之差不大于1，同时子树也必须是一颗平衡二叉树。

## 121. Best Time to Buy and Sell Stock

> 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
>
> 如果你最多只允许完成一笔交易（即买入和卖出一支股票），设计一个算法来计算你所能获取的最大利润。
>
> 注意你不能在买入股票前卖出股票。
>
> 示例 1:
>
> 输入: [7,1,5,3,6,4]
> 输出: 5
> 解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
>      注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格。
>
> 示例 2:
>
> 输入: [7,6,4,3,1]
> 输出: 0
> 解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。

<!-- more -->

### 方法一：暴力法

最容易想到的暴力法就是比较每个元素与后面的元素的差值。假设数组长度为n，则第一次要比较n-1次，第二个要比较n-2次，以此类推，第n个要比较n-(n-1)=1次。所以总次数也就是时间复杂度为$O(n^2)$。

#### 代码

```java
public int maxProfit(int[] prices) {
    int maxprofit = 0;
    // 前一个元素
    for (int i = 0; i < prices.length - 1; i++) {
        // 后一个元素
        for (int j = 0; j < prices.length; j++) {
            // 记录差值
            int profit = prices[j] - prices[i];
            // 如果当前差值比maxprofit大，就将maxprofit替换成当前差值
            if (profit > maxprofit) {
                maxprofit = profit;
            }
        }
    }
    return maxprofit;
}
```

#### 复杂度分析

* **时间复杂度**：$O(n^2)$，循环进行了$(n-1)+(n-2)+...+1=\frac{n(n-1)}{2}$次。
* **空间复杂度**：$O(1)$。因此只使用了常数个变量。

### 一次遍历

遍历一次数组，在遍历每一天时，既要用一个变量判断历史最低价格`minprice`，也要在当天判断当天与历史最低价格的差值是否是最大利润。

#### 代码

```java
public int maxProfit(int[] prices) {
    int minprice = Integer.MAX_VALUE;
    int maxprofit = 0;
    for (int i = 0; i < prices.length; i++) {
        if (prices[i] < minprice) {
            minprice = prices[i];
        }
        else if (prices[i] - minprice > maxprofit) {
            maxprofit = prices[i] - minprice;
        }
    }
    return maxprofit;
}
```

首先，设置`minprice`为最大值，`maxprofit`为0。然后开始遍历数组。

如果当前数组的值比`minprice`小，就发生替换；如果更大就不替换。这样就能得到这个数组中最小的值。然后用当前数组的值减去`minprice`，如果得到的利润大于最大利润，就得到最大利润。因为这个都放在同一个`for`循环里，所以遍历的顺序是从0从n，从前往后，所以是不存在前面一个数减后面一个数的情况。

这道题评论有质疑这种做法是话如果最小值在数组的最后一位会不成立。实际上亲测是不影响的。可以通过下图说明。

![](https://s3.ax1x.com/2021/01/07/seb1x0.jpg)

由上图可发现，尽管最后一位才是数组的最小值，最后的`minprice`也更新为了1，但是因为之前已经保留了`maxprofit`的值为4，所以最后一位的最小值被当前元素相减，结果为1仍然小于4，所以不会更新替换`maxprofit`的值，所以结果仍然是正确的。

#### 复杂度

* **时间复杂度**：因为只使用了一次`for`循环遍历了整个数组，所以时间复杂度是$O(n)$。
* **空间复杂度**：是使用了常数个变量，所以是$O(1)$。

## 136. Single Number

> 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
>
> 你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗
> 示例 1:
>
> 输入: [2,2,1]
> 输出: 1
> 示例 2:
>
> 输入: [4,1,2,1,2]
> 输出: 4

因为要求「不使用额外的空间」，所以使用集合、HashMap等方式都是不可取的。不然的话，思路大概有以下几种：

* 使用**集合**存储数字。遍历数组中的每个数字，如果集合中没有该数字，就将其加入集合，如果已存在，就将它从集合中删除。这样最后剩下的数字就是只出现了一次的数字。
* 使用HashMap来存储**每个数字**和**该数字出现的次数**。遍历数组，就可以得到每个数字出现的次数，然后更新HashMap的值，最终为1的就是只出现一次的数字。
* 使用Set集合存储数组中出现的所有数字，并计算数组中的元素之和。由于Set集合保证元素无重复，因此计算集合中的所有元素之和的两倍，即为每个元素出现两次的情况下的元素之和。由于数组中只有一个元素出现一次，其余元素都出现两次，因此用集合中的元素之和的两倍减去数组中的元素之和，剩下的数就是数组中只出现一次的数字。

上述的三种方法都需要$O(n)$的空间，所以并不满足此题的要求。

这里需要注意的是如果是List，则`remove()`方法需要是移除元素而不是索引，因为是一个整型数组，所以需要用`indexOf()`的方法获取具体的元素值，不然就默认是索引值。而如果是Set，则没有`get()`方法，需要用`iterator()`的方法去显示。

```Java
public static int uniqueAward1(int[] nums) {
    // write code here
    int len = nums.length;
    List<Integer> list = new ArrayList<>();
    for (int i = 0; i < len; i++) {
        if (list.contains(nums[i])) {
            list.remove(list.indexOf(nums[i]));
        } else {
            list.add(nums[i]);
        }
    }
    return list.get(0);
}

/**
 * 使用HashSet方法
 *
 * @param nums
 * @return
 */
public static int uniqueAward2(int[] nums) {
    int len = nums.length;
    Set<Integer> set = new HashSet<>();
    for (int i = 0; i < len; i++) {
        if (set.contains(nums[i])) {
            set.remove(nums[i]);
        } else {
            set.add(nums[i]);
        }
    }

    Iterator<Integer> it = set.iterator();
    while (it.hasNext()) {
        return it.next();
    }
    return -1;
}

/**
 * 使用集合数组相减的方式
 *
 * @param nums
 * @return
 */
public static int uniqueAward3(int[] nums) {
    Set<Integer> sets = new HashSet<>();
    int countArray = 0;
    int countSet = 0;
    for (int i = 0; i < nums.length; i++) {
        sets.add(nums[i]);
        countArray += nums[i];
    }
    Iterator<Integer> it = sets.iterator();
    while (it.hasNext()) {
        countSet += it.next();
    }

    return 2 * countSet - countArray;
}
```

那么，如何才能做到线性时间复杂度和常数空间复杂度呢？

答案是使用**位运算**。对于这道题，可使用**异或运算**$\oplus$。异或运算有以下三个性质。

* 任何数和0做异或运算，结果仍然是原来的数，即 $a \oplus 0=a$。
* 任何数和其自身做异或运算，结果是0，即$a \oplus a=0$。
* 异或运算满足交换律和结合律，即$a \oplus b \oplus a=b \oplus a \oplus a=b \oplus (a \oplus a)=b \oplus0=b$。

```Java
public static int singleNumber(int[] nums) {
    int single = 0;
    for (int num : nums) {
        single ^= num;
    }
    return single;
}
```

## 141. Linked List Cycle

> 给定一个链表，判断链表中是否有环。

代码位于：https://github.com/HurleyJames/MyLeetCode/blob/master/src/basic/LinkedListRing.java

这个题目可以衍生为三个问题。

1. 判断一个带头节点的单链表L是否有环
2. 假如有环，找出环的入口节点
3. 求环的长度

要判断单链表是否有环，肯定要判断两个指针是否相等。可以用到「**快慢指针法**」。设置两个指针fast和slow，都是从头节点触发往后走，slow每次走一步，fast每次走两步，这两个指针一直往后面走，直到后面fast为空，则说明单链表没有环。如果直到fast走到与slow相等，则说明单链表有环。

```Java
public static boolean hasRing(LNode l) {
    if (head == null) {
        return false;
    }
    if (head.next == null) {
        return false;
    }
    // 都指向头节点开始
    LNode p = head;
    LNode q = head;

    if (q.next != null) {
        // 快指针
        q = q.next.next;
    } else {
        return false;
    }
    // 慢指针
    p = p.next;
    while (q != p) {
        if (q != null && q.next != null) {
            q = q.next.next;
        } else {
            return false;
        }
        p = p.next;
    }
    // 当p=q时，说明相遇，则有环
    return true;
}
```

寻找入口节点则是在上面的程序后添加

```Java
while (head != p) {
    p = p.next;
    head = head.next;
}
return p;
```

求环的长度是在找到入口节点后，再绕一圈回到入口节点时，走过的路程就是环的长度

```Java
// p是上面的程序中找到的入口节点的指针；
LNode p;
if (p == null) {
    return 0;
}
LNode q = p.next;
int length = 1;
while (p != q) {
    length++;
    q = q.next;
}
// 当p=q时，说明回到了入口节点
return length;
```

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

## 160. Intersection of Two Linked Lists

> **相交链表**
>
> Write a program to find the node at which the intersection of two singly linked lists begins.

<!-- more -->

### 方法一：暴力法

#### 思路

非常容易想到的就是暴力法。采用双重遍历的方式，先从链表A中选出一个节点，然后遍历整个链表B，看是否能找到与之相同的节点。如果能的话，就返回该节点；如果不能，则继续遍历链表A，然后重复。

#### 代码

```java
public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
    // 如果某个链表为空，是肯定不会相交的
    if (headA == null || headB == null) {
        return null;
    }
    while (headA != null) {
        ListNode newHead = headB;
        while (newHead != null) {
            // 如果相等，就找到了相交点
            if (headA == newHead) {
                return newHead;
            } else {
                newHead = newHead.next;
            }
        }
        headA = headA.next;
    }
    // 如果遍历完了都没有找到，说明没有相交点
    return null;
}
```

虽然这种方法思路上十分简单清晰，但是在代码中仍然有需要注意的地方。

1. 这里判断节点相同，可以直接采用`nodeA == nodeB`的方式去判断，而不是通过他们的值`val`去判断。因为，这里仅仅是值相等并没有用，必须要它们的下一个节点以及之后的节点都相等，才是找到了相交节点。

2. 在第一层循环的里面，我们又定义了`ListNode newHead = headB`。这一步看起来是多余的，但是如果不这么定义一个新的变量的话，那么在第二层循环的判断条件那里，就会变成是`while (headB != null)`。那么当第一遍遍历整个链表B却没有找到与链表A中一个节点$a_i$相同的节点的话，`headB = headB.next`最终会使得`headB == null`，即遍历到链表B的末尾。这样就没有再为链表B从头开始遍历了。

    所以，必须要使用其它元素来保存遍历的链表B的节点。这里用的是`ListNode newHead = headB`。

##### 复杂度分析

* **时间复杂度**：因为这里采用的双重循环遍历两个链表。假设链表A的长度为m，链表B的长度为n，所以时间复杂度为$O(mn)$。
* **空间复杂度**：$O(1)$。

### 方法二：哈希法

#### 思路

先遍历链表A，把链表A的所有节点放入一个set中。然后再遍历链表B，判断如果链表B中的某个节点出现在set中，那么这就是相交节点。

#### 代码

```java
public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
    Set s = new HashSet();
    // 遍历链表A，把链表A的节点全部存入set中
    while (headA != null) {
        s.add(headA);
        headA = headA.next;
    }
    while (headB != null) {
        // 遍历链表B，判断set中是否存在相同的节点
        if (s.contains(headB)) {
            return headB;
        }
        headB = headB.next;
    }
    return null;
}
```

##### 复杂度分析

* **时间复杂度**：因为这里用到的HashSet的底层是通过HashMap来实现的，所以进行`add`或者`contains`等操作的时间复杂度都是$O(1)$。因为进行了两次不是嵌套的循环，所以假设链表A的长度为m，链表B的长度为n，则时间复杂度为$O(m+n)$。
* **空间复杂度**：因为这里用了HashSet去存储节点，所以要么存储了链表A的长度要么存储了链表B的长度。所以空间复杂度为$O(m)$或者$O(n)$。

### 方法三：双指针法

#### 思路

在LeetCode的评论区，看到很多人评论这是一种很浪漫的方法。即

> 错的人迟早会走散，而对的人迟早会相逢！

双指针的方式其实思考起来还是很清晰的。用两个指针a和b分别从链表A和链表B开始遍历，当a遍历完链表A之后，就去遍历链表B；同样的，当b遍历完链表B之后，就去遍历链表A。这样，如果它们是相交的，则最终走过的长度肯定是一样的，即会在交点相遇。可以用下图一样，将两个链表连成一个环。

![](https://raw.githubusercontent.com/HurleyJames/ImageHosting/master/6d24c0d2f451f8cfccea0edaff474d5d1e834d2199272974915d80e332f5fb50-1571538464(1).jpg)

然后遍历过程如下动图所示：

![](https://raw.githubusercontent.com/HurleyJames/ImageHosting/master/396526c47e043feb977e59f98d8df9165ae249d5042ca60ee4d3121c05fea067-%E5%8A%A8%E6%80%81%E5%9B%BE.gif)

因为连成一个环后，假设有相交的节点，则最终走过的链表A加上链表B的长度是一样，最终都会相遇于交点。

（今天**情人节**，值得反思一下🤔）

#### 代码

```java
public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
    ListNode a = headA;
    ListNode b = headB;
    while (a != b) {
        if (a != null) {
            // 继续遍历链表A
            a = a.next;
        } else {
            // 去遍历链表B，从头结点开始
            a = headB;
        }

        if (b != null) {
            // 继续遍历链表B
            b = b.next;
        } else {
            // 去遍历链表A，从头节点开始
            b = headA;
        }
    }
    return a;
}
```

##### 复杂度分析

* **时间复杂度**：因为这个方法同样遍历了链表A和链表B，所以时间复杂度为$O(m+n)$。
* **空间复杂度**：这里没有去存储节点，所以空间复杂度为$O(1)$。

## 206. Reverse Linked List

> **反转链表**
>
> Reverse a singly linked list.
>
> **Example:**
>
> ```
> Input: 1->2->3->4->5->NULL
> Output: 5->4->3->2->1->NULL
> ```

<!-- more -->

### 方法一：递归法

#### 思路

因为之前做了比较多树的题目，发现树的题目都是用递归遍历的方式比用迭代的方式要简单的多。但是对于这题，递归反而更难理解。

这题的递归主要是通过一个判断条件，当当前节点或者当前节点的下一个节点为`null`时，就改变节点的指向，将head的下一个节点指向head，具体是用如下一句代码

```java
head.next.next = head;
```

我们先看一个动态图来知道大概流程，然后再具体分析代码是如何实现的。

![](https://raw.githubusercontent.com/HurleyJames/ImageHosting/master/dacd1bf55dec5c8b38d0904f26e472e2024fc8bee4ea46e3aa676f340ba1eb9d-%E9%80%92%E5%BD%92.gif)

#### 代码

```java
public ListNode reverseList(ListNode head) {
    // 方法一：递归
    // 如果头结点为空，或者只有一个头结点，那么翻转过来就是头结点本身
    // 终止条件是，当前节点或者下一个节点为 null
    if (head == null || head.next == null) {
        return head;
    }
    ListNode p = reverseList(head.next);
    // 改变节点的指向
    head.next.next = head;
    head.next = null;
    return p;
}
```

我们可以根据代码和上面的动图来一步一步走一下这个程序。首先，这句代码`ListNode p = reverseList(head.next)`采用了递归的方式，假设这个链表是`1->2->3->4->5`，那么`head`最开始是1，`head.next`则是2，那么上面这句递归的代码就跳转去执行`reverseList(head.next)`即`reverseList(2)`，这样递归下去最终会执行`reverseList(4.next)`即`reverseList(5)`。因为当头结点为5时，`5.next`为`null`，所以满足第一行代码`if`语句的终止条件，就会返回`head`即返回5。

然后跳出这最后一层递归，即执行完了`reverseList(5)`，去接着执行`reverseList(4)`。这里有一句重要的**改变节点指向**的代码`head.next.next = head`。我们知道这时候的head是4，所以这句代码其实就是`4.next.next = 4`，而`4.next`在该链表中即为5，所以最终就是`5.next = 4`，即`5->4`，5的下一个节点又指向了4。

这里再注意题目的要求是翻转链表。而我们经过上面的操作后就变成了`4->5`，而且`5->4`，这就变成了双向链表了，所以我们要解除4指向5的关系，就通过这句代码`head.next =  null`，即`4.next  = null`，就把这个关系解除了（具体可以通过观察动图来理解）。

这样最终会返回原链表的头结点即1，然后头结点的下一个节点为`null`，就结束翻转了。

##### 复杂度分析

* **时间复杂度**：因为将链表从头走到尾，所以时间复杂度为$O(n)$，n为链表的长度。
* **空间复杂度**：因为这个方法使用了递归，递归会使用到**隐式栈空间**，所以递归的深度可能会达到n层，所以是$O(n)$。

### 方法二：双指针迭代法

#### 思路

我们可以申请两个指针，`prev`和`curr`。`prev`最初指向`null`，而`curr`指向`head`。然后遍历`curr`，并通过一个临时指针`temp`来储存`curr`的下一个节点即`curr.next`，然后让这个临时指针记录下一个节点`temp = curr.next`，然后让`curr`指向`prev`。最后继续遍历，让`prev`和`curr`都向前进一位，`prev = curr; curr = temp`。

具体演示效果如下所示：

![](https://raw.githubusercontent.com/HurleyJames/ImageHosting/master/7d8712af4fbb870537607b1dd95d66c248eb178db4319919c32d9304ee85b602-%E8%BF%AD%E4%BB%A3.gif)

#### 代码

```java
public ListNode reverseList(ListNode head) {

    // 方法二：迭代
    // 申请节点，pre 和 curr，pre 指向 null
    ListNode prev = null;
    ListNode curr = head;
    ListNode tmp = null;
    while (curr != null) {
        // 记录当前节点的下一个节点
        tmp = curr.next;
        // 然后将当前节点指向 pre
        curr.next = prev;
        // pre 和 curr 节点都前进一位
        prev = curr;
        curr = tmp;
    }
    return prev;
}
```

##### 复杂度分析

* **时间复杂度**：因为这个过程同样是将链表从头遍历到尾，所以时间复杂度为$O(n)$。
* **空间复杂度**：$O(1)$。

### 方法三：遍历法

#### 思路

递归反转法是从前往后开始依次反转各个节点的指针域的指向。

就是将当前节点`cur`的下一个节点`cur.next`缓存到temp后，然后更改当前节点的指针指向前一个节点`pre`。结束之后，再往后移，让`pre`变成`cur`，`cur`变成`temp`。

* pre：上一结点
* cur: 当前结点
* tmp: 临时结点，用于保存当前结点的指针域（即下一结点）

#### 代码

```Java
public static Node reverseByTraverse(Node head) {
    if (head == null) {
        return head;
    }
    // pre指向前一个节点
    Node pre = head;
    // cur指向后一个节点
    Node cur = head.getnext();
    // tmp是临时节点，用来储存cur的下一个节点的
    Node tmp;

    while (cur != null) {
        // 用来存储cur的下一个节点
        tmp = cur.getnext();
        // 反转指针的指向
        cur.setnext(pre);

        // 指针都向后移动
        pre = cur;
        cur = tmp;
        // 循环反转
    }
    // 最后将原链表的头节点的指针域置为null，还回新链表的头结点，即原链表的尾结点
    // 因为head相当于尾节点了
    head.setnext(null);

    return pre;
}
```

## 226. Invert Binary Tree

> **翻转二叉树**
>
> Invert a binary tree.
>
> **Example:**
>
> Input:
>
> ```
>   4
> /   \
> 2     7
> / \   / \
> 1   3 6   9
> ```
>
> Output:
>
> ```
>   4
> /   \
> 7     2
> / \   / \
> 9   6 3   1
> ```

<!-- more -->

### 递归法

通过观察输入和输出，可以发现就是把所有的子树的左右结点都互换位置。所以可以使用**递归**的方法交换左节点和右节点。

```java
public class Invert_Binary_Tree {

    public TreeNode invertTree(TreeNode root) {
        if (root == null) {
            return null;
        }
        // 交换左右子树节点
        swap(root);
        // 递归当前节点的左子树
        invertTree(root.right);
        // 递归当前节点的右子树
        invertTree(root.left);
        return root;
    }

    /**
     * 交换左右子树节点
     *
     * @param root
     */
    public void swap(TreeNode root) {
        TreeNode tmp = root.left;
        root.left = root.right;
        root.right = tmp;
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

关键的三行代码就是`swap(root)`和`invertTree(root.left)`以及`invertTree(root.right)`。

#### 复杂度分析

* **时间复杂度：**因为要递归所有的左子树节点和右子树节点，所有时间复杂度为$O(n)$。
* **空间复杂度：**假设树的高度为h，则最坏情况下需要$O(h)$个函数存放。

### 迭代法

递归的实现方式其实就是深度优先搜索BFS的方式，而迭代法就是广度优先搜索DFS的方式。

广度优先搜索需要额外的数据结构——队列，来存放临时遍历的元素。

首先将根节点放入到队列中，然后对当前元素调换其左右子树的位置，然后再判断其左子树是否为空，不为空就放入队列中；然后判断其右子树是否为空，不为空就放入到队列中。

```java
public class Invert_Binary_Tree {

    public TreeNode invertTree(TreeNode root) {
        if (root == null) {
            return null;
        }
        LinkedList<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        while(!queue.isEmpty()) {
            // 每次从队列中拿出一个节点，并交换这个节点的左右子树
            TreeNode tmp = queue.poll();
            swap(tmp);
            // 如果当前节点的左子树不为空，则放入队列等待后续处理
            if (tmp.left != null) {
                queue.add(tmp.left);
            }
            // 如果当前节点的右子树不为空，则放入队列等待后续处理
            if (tmp.right != null) {
                queue.add(tmp.right);
            }
        }
        return root;
    }

    /**
     * 交换左右子树节点
     *
     * @param root
     */
    public void swap(TreeNode root) {
        TreeNode tmp = root.left;
        root.left = root.right;
        root.right = tmp;
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

动态图如下：

![](https://raw.githubusercontent.com/HurleyJames/ImageHosting/master/f9e06159617cbf8372b544daee37be70286c3d9b762c016664e225044fc4d479-226_%E8%BF%AD%E4%BB%A3.gif)

#### 复杂度分析

* **时间复杂度：**因为每个节点都要判断是否子树为空，即每个节点都被入队出队一次，所以时间复杂度为$O(n)$。
* **空间复杂度：**在最坏的情况下，队列里会包含树中的所有的节点。而如果是一颗完整二叉树，那么叶子节点那一层就拥有$[\frac{n}{2}]=O(n)$个节点。

## 268. Missing Number

## 349. Intersection of Two Arrays

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

## 463. Island Perimeter

> 给定一个包含 0 和 1 的二维网格地图，其中 1 表示陆地 0 表示水域。
>
> 网格中的格子水平和垂直方向相连（对角线方向不相连）。整个网格被水完全包围，但其中恰好有一个岛屿（或者说，一个或多个表示陆地的格子相连组成的岛屿）。
>
> 岛屿中没有“湖”（“湖” 指水域在岛屿内部且不和岛屿周围的水相连）。格子是边长为 1 的正方形。网格为长方形，且宽度和高度均不超过 100 。计算这个岛屿的周长。
>
>  
>
> 示例 :
>
> 输入:
> [[0,1,0,0],
>  [1,1,1,0],
>  [0,1,0,0],
>  [1,1,0,0]]
>
> 输出: 16
>
> 解释: 它的周长是下面图片中的 16 个黄色的边：

<!-- more -->

这道题的思路是总的正方形块树的数量乘以4条边，然后减去重合的边树乘以2，就是岛屿的周长。所以解题的关键就是在于**有规律的找到有多少次的重叠**，这样能够避免重复的计算。

#### 代码

最开始想到的代码写法是这样的：

```java
public int islandPerimeter(int[][] grid) {
    // 如果该矩阵为空
    if (grid.length == 0 || grid[0].length == 0) {
        return 0;
    }

    // 陆地的数量
    int land = 0;
    // 重叠的数量
    int overlap = 0;
    for (int i = 0; i < grid.length; i++) {
        for (int j = 0; j < grid[0].length; j++) {
            // 规定数组元素为1时是陆地
            if (grid[i][j] == 1) {
                land++;
                // 分别找上下左右是否是陆地，如果是陆地就意味着有重合
                // 下
                // 因为判断下边，所以i要小于grid.length-1，不然就已经是最下边的元素了
                if (i < grid.length - 1 && grid[i][j] == grid[i + 1][j]) {
                    overlap++;
                }
                // 右
                // 因为判断右边，所以j要小于grid[i].length-1，不然就已经是最右边的元素了
                if (j < grid[i].length - 1 && grid[i][j] == grid[i][j + 1]) {
                    overlap++;
                }
                // 左
                // 因为判断左边，所以j要大于0，不然就已经是最左边了
                if (j > 0 && grid[i][j] == grid[i][j - 1]) {
                    overlap++;
                }
                // 上
                // 因为判断上边，所以i要大于0，不然就已经是最上边了
                if (i > 0 && grid[i][j] == grid[i - 1][j]) {
                    overlap++;
                }
            }
        }
    }
    return 4 * land - 2 * overlap;
}
```

刚开始想到的就是上下左右进行判断是否是陆地，如果是陆地，就说明了有重叠部分。但是这样去提交代码测试结果却发现是错误的。后来才想明白，其实上下左右只要判断两个方向就可以了。

例如判断左边的部分，首先条件`j > 0`本来就是恒成立的，因为`for`循环是从0开始递增的，所以这里是多余的。然后，在双层循环了里，判断`grid[i][j] == grid[i][j + 1]`和判断`grid[i][j] == grid[i][j - 1]`其实是一样的效果。所以如果在这里判断了两侧，就会造成`overlap`累加了两次，从而计算错误。

**正确的代码**：

```java
public int islandPerimeter(int[][] grid) {
    // 如果该矩阵为空
    if (grid.length == 0 || grid[0].length == 0) {
        return 0;
    }

    // 陆地的数量
    int land = 0;
    // 重叠的数量
    int overlap = 0;
    for (int i = 0; i < grid.length; i++) {
        for (int j = 0; j < grid[0].length; j++) {
            // 规定数组元素为1时是陆地
            if (grid[i][j] == 1) {
                land++;
                // 分别找上下左右是否是陆地，如果是陆地就意味着有重合
                // 纵向
                // 因为判断下边，所以i要小于grid.length-1，不然就已经是最下边的元素了
                if (i < grid.length - 1 && grid[i][j] == grid[i + 1][j]) {
                    overlap++;
                }
                // 横向
                // 因为判断右边，所以j要小于grid[i].length-1，不然就已经是最右边的元素了
                if (j < grid[i].length - 1 && grid[i][j] == grid[i][j + 1]) {
                    overlap++;
                }
            }
        }
    }
    return 4 * land - 2 * overlap;
}
```

`return 4 * land - 2 * overlap`的原因是根据规律得知，最终的周长就是陆地的数量乘以4条边然后减去重合数量的2倍（因为重复计算了2条边）。

#### 复杂度分析

* **时间复杂度**：如果这个二维矩阵的宽高分别为m和n，那么进行了双层循环，所以时间复杂度为$O(mn)$。

## 543. Diameter of Binary Tree

> **二叉树直径**
>
> Given a binary tree, you need to compute the length of the diameter of the tree. The diameter of a binary tree is the length of the **longest** path between any two nodes in a tree. This path may or may not pass through the root.
>
> **Example:**
> Given a binary tree
>
> ```
>        1
>       / \
>      2   3
>     / \     
>    4   5    
> ```
>
> Return **3**, which is the length of the path [4,2,1,3] or [5,2,1,3].

<!-- more -->

### 思路

关于二叉树直径的定义是：**二叉树中从一个结点到另一个结点最长的路径**，叫做二叉树的直径。

这里存在一个陷阱，就是容易受到题目中例子的影响，认为二叉树的直径就是左子树的深度+右子树的深度。实际上，二叉树的直径**不一定经过根节点root**。有个例子如下图所示：

![](https://raw.githubusercontent.com/HurleyJames/ImageHosting/master/IMG_8D22A19495F3-1.jpeg)

所以，采用**分治**和**递归**的思想：二叉树的直径=$Max$（左子树的直径，右子树的直径，左子树的最大深度+右子树的最大深度+1）。

### 代码

```java
public class Diameter_of_Binary_Tree {

    int diameter = 0;

    public int diameterOfBinaryTree(TreeNode root) {
        depth(root);
        return diameter;
    }

    private int depth(TreeNode root) {
        if (root == null) {
            return 0;
        }
        // 获得左子树的深度
        int left = depth(root.left);
        // 获得右子树的深度
        int right = depth(root.right);
        diameter = Math.max(diameter, left + right);
        return Math.max(left, right) + 1;
    }

    class TreeNode {
        TreeNode left;
        TreeNode right;
        int val;

        TreeNode(int x) {
            val = x;
        }
    }
}
```

#### 复杂度分析

* **时间复杂度：**因为这题需要对左、右子树都进行递归遍历操作，所以每个节点都要访问一次，因为是$O(n)$。
* **空间复杂度：**主要是进行DFS深度优先搜索的栈开销，为$O(n)$。

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

## 572. Subtree of Another Tree

> **另一个树的子树**
>
> Given two non-empty binary trees **s** and **t**, check whether tree **t** has exactly the same structure and node values with a subtree of **s**. A subtree of **s** is a tree consists of a node in **s** and all of this node's descendants. The tree **s** could also be considered as a subtree of itself.
>
> **Example 1:**
> Given tree s:
>
> ```
>   3
>  / \
> 4   5
> / \
> 1   2
> ```
>
> Given tree t:
>
> ```
> 4 
> / \
> 1   2
> ```
>
> Return **true**, because t has the same structure and node values with a subtree of s.
>
> **Example 2:**
> Given tree s:
>
> ```
>   3
>  / \
> 4   5
> / \
> 1   2
>  /
> 0
> ```
>
> Given tree t:
>
> ```
> 4
> / \
> 1   2
> ```
>
> Return **false**.

<!-- more -->

### 方法一：先序遍历

因为我们知道树的表示方式的一种就是以先序遍历的方式表示出来。所以，我们把两棵树s和t分别以先序遍历的方式表示（以字符串表示），然后判断t是否是s的子字符串即可判断出是否是其的子树。

通常，如果左节点或者右节点为空，我们就会把它以`null`的形式表示，但是在这里是要判断结构和节点是否相同，所以不能简单地用`null`来区分。

当左孩子为空时，要赋值为`lnull`；当右孩子为空时，要赋值为`rnull`。

还有一点非常重要的是，因为我们是把它转化为字符串，用字符串`contains`的方式来判断是否是子串，这样容易把更小的数字认为是更大的数字的子串。例如，会把`3`认为是`23`的子串，但是在这里显然是不同的，如果一个是`3`，一个是`23`，那么就不是子树了。所以，我们要为每个节点前加一个`#`，就可以解决这个问题了。

关于以上`contains`方法的问题，如果含有空左孩子或右孩子时，即有`lnull`或者`rnull`时也不会有问题，但是如果没有，那么当两棵树为`[12]`和`[2]`时，就会输出`true`，然而实际是`false`。**所以一定要为数字前加上一个字符**。

#### 代码

```java
/**
 * Given two non-empty binary trees s and t, check whether tree t has exactly the same structure and node values with a subtree of s. A subtree of s is a tree consists of a node in s and all of this node's descendants. The tree s could also be considered as a subtree of itself.
 */
public class Subtree_of_Another_Tree {

    public boolean isSubtree(TreeNode s, TreeNode t) {
        String tree1 = preOrder(s, true);
        String tree2 = preOrder(t, true);
        if (tree1.contains(tree2)) {
            return true;
        } else {
            return false;
        }
    }

    private String preOrder(TreeNode node, boolean left) {
        if (node == null) {
            // 如果是左孩子节点为空
            if (left) {
                // 设置为 lnull
                return "lnull";
            } else {
                // 右孩子节点为空，设置为 rnull
                return "rnull";
            }
        }
        // 给每个节点前加上 # 号
        // 如果 preOrder 的第一个参数是 left，那么就是 true
        // 如果 preOrder 的第一个参数是 right，那么就是 false
        return "#" + node.val + " " + preOrder(node.left, true) + " " + preOrder(node.right, false);
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

##### 复杂度分析

* **时间复杂度**：采用先序遍历的方式表示树，那么两棵树的花费的时间为$O(m)$和$O(n)$。最后用字符串判断是否包含的方式花费的时间为$O(mn)$，所以总的时间复杂度为$O(m+n+mn)$。
* **空间复杂度**：主要取决于哪棵树的空间更大。所以是$O(max(m,n))$。

### 方法二：比较节点

我们可以把每个给定节点t的子树都作为根，然后判断以t为根的子树是否与给定的子树相同。为了检查是否完全相同，我们就需要比较两个子树的所有节点。

首先，我们定义一个`equals(x,y)`函数去检查两个树是否相等。它先检查两个树的根是否相等，然后再递归判断左子树和右子树。

然后，使用一个函数`traverse(s,t)`，遍历给定的树s并将每个节点都当作子树的根。

#### 代码

```java
public class Subtree_of_Another_Tree {

    public boolean isSubtree(TreeNode s, TreeNode t) {
        return traverse(s, t);
    }

    private boolean traverse(TreeNode s, TreeNode t) {
        return s != null && (equals(s, t) || traverse(s.left, t) || traverse(s.right, t));
    }

    /**
     * 比较两个树是否相同
     *
     * @param t1
     * @param t2
     * @return
     */
    private boolean equals(TreeNode t1, TreeNode t2) {
        if (t1 == null && t2 == null) {
            return true;
        }
        if (t1 == null || t2 == null) {
            return false;
        }
        // 如果节点值相同，且左孩子和右孩子的节点值也相同，则返回 true
        return t1.val == t2.val && equals(t1.left, t2.left) && equals(t1.right, t2.right);
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

##### 复杂度分析

* **时间复杂度**：在最坏的情况下，即一棵树为倾斜树时，需要$O(mn)$时间。
* **空间复杂度**：如果n为树的节点数，那么空间复杂度为$O(n)$。

## 617. Merge Two Binary Trees

> **合并二叉树**
>
> Given two binary trees and imagine that when you put one of them to cover the other, some nodes of the two trees are overlapped while the others are not.
>
> You need to merge them into a new binary tree. The merge rule is that if two nodes overlap, then sum node values up as the new value of the merged node. Otherwise, the NOT null node will be used as the node of new tree.
>
> **Example 1:**
>
> ```
> Input: 
> 	Tree 1                     Tree 2                  
>        1                         2                             
>       / \                       / \                            
>      3   2                     1   3                        
>     /                           \   \                      
>    5                             4   7                  
> Output: 
> Merged tree:
> 	     3
> 	    / \
> 	   4   5
> 	  / \   \ 
> 	 5   4   7
> ```
>
> **Note:** The merging process must start from the root nodes of both trees.

<!-- more -->

### 递归

如果两棵树的当前节点均不为空，就将它们的值相加，然后继续对它们的左孩子和右孩子进行递归合并；如果有一棵树为空，就直接返回另一颗树的值。



### 迭代

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