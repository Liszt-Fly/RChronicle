<script setup lang="ts">
import { useRouter } from "vue-router";
import { setCurrentFileNode } from "@/api/util";
import path from "path";
import fsp from "fs-extra"
import { validateFilename } from "@/api/FileSystem/filesystem";
import { bClickedParent, cTagContainer, currentFile, openFiles, fTree } from "@/data/configdb";
import { } from "@/api/FileSystem/filesystem";
import { chronicleUserPath } from "@/api/init";
import { ElMessage, ElMessageBox } from "element-plus";
import { onMounted, reactive, ref, watchEffect } from "vue";
import { fileNode } from "@/api/FileTree/fileNode";
import { NodeType } from "@/api/FileTree/type";
import { fromJSON, parse, stringify, toJSON } from "flatted"
const props = defineProps({
  file: Object as () => fileNode,
});

const router = useRouter();
let subfolder = ref<HTMLDivElement | null>(null);
let refSubfolder = reactive({ dom: subfolder });
let namebox = ref<HTMLSpanElement | null>(null);
const fileDom = ref<HTMLElement | null>(null);

function openFile(event: MouseEvent, file: fileNode) {
  //如果是文件
  if (!file.children) {
    openFiles.value.add(props.file!.path!)
    currentFile.value = props.file!.path!;
    let params = path.relative(path.resolve(chronicleUserPath, "assets"), file.path);
    router.push(`/Editor/${params}`);
  }
}

function renameNote() {
  //启用contentEdible
  namebox.value!.contentEditable = "true";
  namebox.value!.focus();
  let range = new Range();
  range.setStart(namebox.value as Node, 0);
  range.setEnd(namebox.value as Node, 1);
  document.getSelection()!.removeAllRanges();
  document.getSelection()!.addRange(range);
}

function toggleSubfolder(
    event: MouseEvent,
    file: fileNode,
    subfolder: { dom: HTMLElement | null }
) {
  if (file.children) {
    if (event) {
      let item = event.currentTarget as HTMLElement;
      let folder = item.firstElementChild!;
      folder.classList.toggle("bi-folder");
      folder.classList.toggle("bi-folder2-open");
      if (folder.classList.contains("bi-folder2-open")) {
        if (subfolder.dom) {
          subfolder.dom.style.display = "block";
        }
      } else {
        if (subfolder.dom) {
          subfolder.dom.style.display = "";
        }
      }
    }
  }
}

function enter(event: KeyboardEvent) {
  let target = event.target as HTMLDivElement;
  target.blur();
}

// 右键菜单

const drop = (e: DragEvent) => {
  // FIXME: 仅仅检查了自己放置自己的情况，还有一种放置本身区域的情况没有做完
  let filepath = e.dataTransfer?.getData("path") as string

  //* 如果放置的区域就是发送的区域，啥也不做
  if (filepath == props.file!.path) return
  //* 获取对应的节点
  let node = fTree.value?.getNode(filepath, fTree.value.root)!
  if (props.file!.parent == node.parent && props.file!.type == NodeType.FILE) return
  if (props.file!.children?.includes(node)) return
  //* 当接受区域是文件夹类型
  if (props.file!.type == NodeType.FOLDER) {

    //* 进行文件操作
    fsp.copySync(node.path, path.resolve(props.file!.path, node.name))
    //* 生成一个node
    let generatedNode = new fileNode(path.resolve(props.file!.path, node.name), node.name)
    generatedNode.parent = props.file!
    generatedNode.parent!.children?.push(generatedNode)
    //* 销毁本身区域的节点内容
    node.removeSelf()
  }
  //* 如果是文件类型
  else if (props.file!.type == NodeType.FILE) {
    //* 开展寻根行动
    let parent = props.file!.parent!
    //* 进行文件操作
    fsp.copySync(node.path, path.resolve(parent.path, node.name))
    //* 生成一个node
    let generatedNode = new fileNode(path.resolve(parent.path, node.name), node.name)
    generatedNode.parent = parent
    generatedNode.parent!.children?.push(generatedNode)
    node.removeSelf()
  }
}
const startDrag = (e: DragEvent) => {

  e.dataTransfer?.setData("path", props.file!.path)

}

const getEmoji = (str: string) => {
  let group = str!.match(/[\u{1F601}-\u{1F64F}\u{2702}-\u{27B0}\u{1F680}-\u{1F6C0}\u{1F170}-\u{1F251}\u{1F600}-\u{1F636}\u{1F681}-\u{1F6C5}\u{1F30D}-\u{1F567}]/gu)
  if (group != null)
    return group[0]
  else return false
}

</script>
<template>

  <div class="folder" v-if="file" ref="fileDom">
    <div class="item" tabindex="1" draggable="true" @dragover.prevent @drop="drop($event)"
         @dragstart="startDrag($event)" @click="toggleSubfolder($event, file!, refSubfolder), openFile($event, file!)"
         :data-path="file.path" v-if="validateFilename(file.name!)"
         :class="[{ 'clicked': props.file!.path == currentFile }]" @contextmenu="setCurrentFileNode(props.file!)">

      <i class="bi bi-file-earmark-text" v-show="!getEmoji(file.name!) && file.type == NodeType.FILE"></i>
      <i class="bi bi-folder" v-show="!getEmoji(file.name!) && file.type == NodeType.FOLDER"></i>

      <span ref="namebox" @blur="props.file!.rename(namebox!.innerText)" @keydown.enter.prevent="enter($event)"
            :class="getEmoji(file.name!) ? 'emoji' : ''" :data-emoji="getEmoji(file.name!) ? getEmoji(file.name!) : ''">
        {{ getEmoji(file.name!) ? validateFilename(file.name!)!.slice(2) : validateFilename(file.name!) }}
      </span>
    </div>
    <div class="subfolder" v-if="file.children" ref="subfolder" id="subfolder">
      <file-list :files="file.children" :file="f" v-for="f in file.children" :key="f.path"></file-list>
    </div>
  </div>


</template>