//工具箱文件
import {NavigationGuardNext, RouteLocationNormalized} from "vue-router";
import {NodeType} from "@/FileTree/type";
import fsp from "fs-extra";
import path from "path";

//* 设置文件和文件夹在没有命名的默认名称
function getDefaultName(type: NodeType): string {
    return type == NodeType.FOLDER ? "笔记本" : "笔记"
}

//* 获取用户在当前页面的工作时间
export const getStayTime = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): number => {
    let startTime = Date.now()
    let stayTime = 0
    if (to) {
        if (from.name == "Editor") {
            let note = from.fullPath.substring(8)
            let currentTime = Date.now()
            let stayTime = (currentTime - startTime) / 1000 / 60
            console.log(`${note}, time: ${stayTime}`);
        }
    }
    if (from) {
        startTime = Date.now()
    }
    next()
    return stayTime
}

//* 获取不重复的数字
export function getValidNumber(basePath: string, index: number, type: NodeType): number {

    //* 如果是文件夹
    if (type == NodeType.FOLDER) {
        if (fsp.existsSync(path.resolve(basePath, getDefaultName(type) + index.toString()))) {
            return getValidNumber(basePath, index + 1, type)
        }
    }
    //* 如果是文件
    else if (type == NodeType.FILE) {
        if (fsp.existsSync(path.resolve(basePath, getDefaultName(type) + index.toString()) + ".md")) {
            return getValidNumber(basePath, index + 1, type)
        }
    }
    return index;
}

export function getValidName(basePath: string, type: NodeType): string {
    //文件夹系统
    if (type == NodeType.FOLDER) {
        return `${getDefaultName(type)}${getValidNumber(basePath, 1, type)}`
    }
    //文件系统
    else if (type == NodeType.FILE) {
        return `${getDefaultName(type)}${getValidNumber(basePath, 1, type)}.md`
    } else {
        return "error"
    }
}


export function removeExtName(file: string): string {
    if (path.extname(file)) {
        let remainedLength = file.length - path.extname(file).length + 1
        //截取字符串
        return file.substring(0, remainedLength - 1)
    } else {
        return file
    }
}
