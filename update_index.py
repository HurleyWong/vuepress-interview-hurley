#!/usr/bin/env python3
import re

# 读取新项目列表
with open('/tmp/springboot_projects.txt', 'r') as f:
    new_projects = f.readlines()

# 读取原始index.md文件
index_path = '/Users/Hurley/Documents/Projects/MyFEProjects/vuepress-graduation-projects/docs/index/index.md'
with open(index_path, 'r') as f:
    content = f.read()

# 查找ProjectTable内容
pattern = r'<ProjectTable content="(.*?)" />'
match = re.search(pattern, content, re.DOTALL)

if match:
    table_content = match.group(1)
    
    # 查找表格标题行和已有内容
    header_pattern = r'(\| 编号.*?\| 文档.*?\|[\r\n]+)'
    header_match = re.search(header_pattern, table_content)
    
    if header_match:
        header = header_match.group(1)
        
        # 替换已有的重复项目
        existing_rows = []
        seen_numbers = set()
        
        for line in table_content.split('\n'):
            if '| ' in line:
                # 提取项目编号
                number_match = re.search(r'\| (\d+)[-\d]*\s+\|', line)
                if number_match:
                    number = number_match.group(1)
                    if number not in seen_numbers:
                        seen_numbers.add(number)
                        # 保留非新增项目的行
                        if not any(new_number in line for new_number in ['191', '192', '193', '194', '195', '196', '197', '198', '199']):
                            existing_rows.append(line)
                else:
                    # 保留标题行
                    if '编号' in line:
                        existing_rows.append(line)
        
        # 构建新表格内容
        new_table_content = header + '\n'.join(existing_rows) + '\n' + '\n'.join(new_projects)
        
        # 替换原表格内容
        new_content = re.sub(pattern, f'<ProjectTable content="{new_table_content}" />', content, flags=re.DOTALL)
        
        # 写回文件
        with open(index_path, 'w') as f:
            f.write(new_content)
        
        print("成功更新index.md文件")
    else:
        print("未找到表格标题行")
else:
    print("未找到ProjectTable内容") 