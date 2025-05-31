# IO流

当我们的程序需要从硬盘、网络或者其它应用程序中读取或者写入数据的时候，数据传输量可能会很大，而我们的内存和带宽是有限的，无法一次性读取写入大量的数据，通过流（Stream）就可以实现一点一点的逐步传输数据。

## 分类

* 按照流的流向分，可以分为**输入流**和**输出流**；
* 按照操作单元分，可以分为**字节流**和**字符流**；
* 按照流的角色分，可以分为**节点流**和**处理流**；

Java的IO流中的类都是从4个抽象类基类中派生出来的。

| 类型 | 输入流 | 输出流 |
| -- | -- | -- |
| **字节流** | InputStream | OutputStream |
| **字符流**| Reader | Writer |

* `InputStream/Reader`：所有的输入流的基类，前者是**字节输入流**，后者是**字符输入流**。
* `OutputStream/Writer`：所有的输出流的基类，前者是**字节输出流**，后者是**字符输出流**。

## 节点流

> **节点流**是直连数据源的流，可以从一个特定的数据源（节点）读写数据。

常用的节点流有：

| 类型 | 字符流 | 字节流 |
| -- | -- | -- |
| File | FileReader/FileWriter | FileInputStream/FileOutputStream |
| Memory Array | CharArrayReader/CharArrayWriter | ByteArrayInputStream/ByteArrayOutputStream |
| Memory String | StringReader/StringWriter |  |
| Pipe | PipedReader/PipedWriter | PipedInputStream/PipedOutputStream |

* File文件流：对文件读、写进行操作：FileReader、FileWriter、FileInputStream、FileOutputStream
* 向内存数组读写数据：CharArrayReader与CharArrayWriter、ByteArrayInputStream与ByteArrayOutputStream
* 向内存字符串中读写数据：StringReader/StringWriter
* Pipe管道流，实现管道的输入与输出（进程间通信）：PipedReader/PipedWriter、PipedInputStream/PipedOutputStream

## 处理流

> **处理流**是连接已存在的流（节点流或者处理流）之上，通过对数据的处理为程序提供更为强大的读写功能。

| 处理类型 | 字符流 | 字节流 |
| -- | -- | -- |
| Buffering | BufferedReader/BufferedWriter | BufferedInputStream/BufferedOutputStream |
| Filtering | FilterReader/FilterWriter | FilterInputStream/FilterOutputStream |
| Converting between bytes and character | InputStreamReader/OutputStreamWriter |  |
| Object Serialization |  | ObjectInputStream/ObjectOutputStream |
| Data conversion |  | DataInputStream/DataOutputStream |
| Counting | LineNumberReader | LineNumberInputStream |
| Peeking ahead | PushbackReader | PushbackInputStream |
| Printing | PrintWriter | PrintStream |