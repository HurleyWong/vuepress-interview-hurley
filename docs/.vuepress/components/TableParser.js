/**
 * 将Markdown表格转换为JSON数据
 * @param {string} markdownTable - Markdown格式的表格字符串
 * @returns {Object} 包含表头和数据的对象
 */
export function parseMarkdownTable(markdownTable) {
  // 按行分割
  const lines = markdownTable.trim().split('\n');
  
  // 至少需要表头行、分隔行和一行数据
  if (lines.length < 3) {
    return { headers: [], data: [] };
  }
  
  // 提取表头行并去除前后空格
  const headerLine = lines[0];
  const headers = headerLine
    .split('|')
    .map(header => header.trim())
    .filter(header => header);
  
  // 跳过分隔行（第二行），从第三行开始处理数据行
  const data = [];
  for (let i = 2; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const rowValues = line
      .split('|')
      .map(cell => cell.trim())
      .filter((_, index) => index > 0 && index <= headers.length);
    
    // 创建行对象
    const rowObject = {};
    headers.forEach((header, index) => {
      rowObject[header] = rowValues[index] || '';
    });
    
    data.push(rowObject);
  }
  
  return { headers, data };
} 