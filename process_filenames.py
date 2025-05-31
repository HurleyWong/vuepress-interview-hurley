#!/usr/bin/env python3
import os
import re

# 文件夹路径
folder_path = "/Users/Hurley/Downloads/05-171套-23-SpringBoot"

# 获取文件列表
files = os.listdir(folder_path)

# 用于存储项目信息的列表
projects = []

# 正则表达式模式，用于匹配项目编号和名称
pattern = re.compile(r'springboot(\d+)(.+?)\.(zip|rar)')

for file in files:
    if file.startswith('springboot') and (file.endswith('.zip') or file.endswith('.rar')):
        match = pattern.match(file)
        if match:
            number = match.group(1)
            name = match.group(2)
            
            # 清理项目名称
            if name.startswith('基于SpringBoot') or name.startswith('基于springboot'):
                # 提取基于SpringBoot后面的部分
                clean_name = re.sub(r'^基于[Ss]pring[Bb]oot的?', '', name)
            elif name.startswith('基于'):
                # 对于其他基于XX的格式，保留原样
                clean_name = name
            elif name.startswith('文理'):
                clean_name = '医院预约挂号系统'
            elif '系统' in name:
                # 如果包含"系统"字样，可能是一个系统名称
                clean_name = name
            else:
                # 否则保留原名
                clean_name = name
            
            # 去除"的设计与实现"、"的开发"等后缀
            clean_name = re.sub(r'的设计与实现$|的开发$|的设计$|的建设$|设计与实现$', '', clean_name)
            
            # 处理一些特殊情况
            clean_name = re.sub(r'^基于[^的]+的', '', clean_name)  # 去除"基于XXX的"
            clean_name = re.sub(r'基于[^的]+的', '', clean_name)   # 去除文本中的"基于XXX的"
            clean_name = re.sub(r'^\+Vue的', 'Vue的', clean_name)  # 修复Vue前缀
            clean_name = re.sub(r'^\-vue的', 'Vue的', clean_name)  # 修复Vue前缀
            clean_name = re.sub(r'^\+vue的', 'Vue的', clean_name)  # 修复Vue前缀
            
            # 去除多余的设计与实现类词语
            clean_name = re.sub(r'设计与开发$|的设计和开发$', '', clean_name)
            
            # 统一系统表述
            clean_name = clean_name.strip()
            if not clean_name.endswith('系统') and not clean_name.endswith('平台') and not clean_name.endswith('网站') and not clean_name.endswith('网'):
                if '系统' in clean_name:
                    # 如果名称中包含"系统"，将其移到末尾
                    clean_name = re.sub(r'系统', '', clean_name) + '系统'
            
            # 生成表格行
            table_row = f"| {number}      | SpringBoot       | 基于SpringBoot的{clean_name}  | 源码+数据库+论文+说明文档 |"
            
            # 检查重复项目编号
            exists = False
            for i, (proj_num, _) in enumerate(projects):
                if proj_num == number:
                    exists = True
                    # 如果223有两个项目，则给第二个添加-2后缀
                    if number == "223" and "知识竞赛" in clean_name:
                        new_number = f"{number}-2"
                        new_row = f"| {new_number}      | SpringBoot       | 基于SpringBoot的{clean_name}  | 源码+数据库+论文+说明文档 |"
                        projects.append((new_number, new_row))
                    break
            
            if not exists:
                projects.append((number, table_row))

# 自然排序函数
def natural_sort_key(s):
    # 分割数字和非数字部分
    return [int(text) if text.isdigit() else text.lower() for text in re.split(r'(\d+)', s[0])]

# 按编号排序
projects.sort(key=natural_sort_key)

# 打印所有表格行
for _, row in projects:
    print(row) 
