#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
程序化生成俯视角美术资产。
风格严格对齐 src/game/render.ts 的扁平卡通画法：
  - 圆角矩形 / 椭圆 / 多边形色块
  - 统一偏移阴影（对应 render.ts 里 rgba(0,0,0,0.3) 的投影）
  - 配色取自渲染代码（玻璃 #2a3440、轮胎 #1d1f22、车身红蓝黄绿等）
视角：正俯视（top-down），车头 / 船头朝画面上方，和游戏内车辆横竖随碰撞盒旋转的约定一致。
输出：png/<id>.png（透明底，320x320）+ preview.png（带中文标签的审查拼图）。
不修改任何游戏代码。
"""
from PIL import Image, ImageDraw, ImageFont
import os

OUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "png")
os.makedirs(OUT_DIR, exist_ok=True)

SS = 4            # 超采样倍率
BASE = 128        # 逻辑画布
TILE = 224        # 审查图里每格图片大小
CELL_W, CELL_H = 250, 262
COLS = 4
FONT_PATH = "C:/Windows/Fonts/msyh.ttc"
FONT_BOLD = "C:/Windows/Fonts/msyhbd.ttc"

# ---- 取自 render.ts 的调色板 ----
TIRE   = "#1d1f22"
GLASS  = "#2a3440"
HI     = (255, 255, 255, 48)
RED    = "#c0392b"
RED_LT = "#d9583a"
BLUE   = "#2e6fb5"
BLUE_LT= "#3b82c9"
BLUE_DK= "#245a93"
YELLOW = "#d9a21b"
YEL_DK = "#b8861b"
OLIVE  = "#5f7c3a"
METAL  = "#7f8a94"
METAL_D= "#4a5057"
WOOD   = "#8f7a52"
WOOD_L = "#c4ad7e"
WOOD_D = "#5c4126"
CREAM  = "#e8e2d4"
RUST   = "#a8492f"


# ---- 绘制辅助（逻辑坐标 -> 超采样像素） ----
def rr(d, u, x, y, w, h, r, fill, outline=None, ow=1):
    d.rounded_rectangle([u(x), u(y), u(x+w), u(y+h)], radius=u(r),
                        fill=fill, outline=outline, width=max(1, u(ow)))

def rc(d, u, x, y, w, h, fill):
    d.rectangle([u(x), u(y), u(x+w), u(y+h)], fill=fill)

def el(d, u, cx, cy, rx, ry, fill, outline=None, ow=1):
    d.ellipse([u(cx-rx), u(cy-ry), u(cx+rx), u(cy+ry)],
              fill=fill, outline=outline, width=max(1, u(ow)))

def pg(d, u, pts, fill):
    d.polygon([(u(x), u(y)) for x, y in pts], fill=fill)

def ln(d, u, pts, fill, width):
    d.line([(u(x), u(y)) for x, y in pts], fill=fill, width=max(1, u(width)))


# ============================ 资产绘制函数 ============================
# 每个函数接收 (draw, u)，只用 0..128 逻辑坐标，车头/船头朝上。

def delivery_truck(d, u):
    """厢式货车：红色驾驶室 + 米白货箱"""
    for wx in (36, 82):
        for wy in (34, 88):
            rr(d, u, wx, wy, 10, 20, 3, TIRE)
    rr(d, u, 38, 56, 52, 58, 5, CREAM, outline="#b9b2a0", ow=1.5)
    rc(d, u, 42, 60, 7, 50, HI)
    ln(d, u, [(64, 60), (64, 110)], "#c9c2b2", 2)
    for gy in (72, 88, 102):
        ln(d, u, [(44, gy), (84, gy)], "#d6d0c1", 1)
    rr(d, u, 42, 20, 44, 38, 9, RED)
    rr(d, u, 47, 21, 34, 13, 4, RED_LT)
    rr(d, u, 48, 34, 32, 13, 3, GLASS)
    rr(d, u, 50, 36, 13, 3, 1, (255, 255, 255, 60))
    rr(d, u, 62, 49, 4, 8, 1, (255, 255, 255, 55))
    rr(d, u, 36, 35, 6, 9, 2, METAL_D)
    rr(d, u, 86, 35, 6, 9, 2, METAL_D)
    rr(d, u, 46, 15, 36, 5, 2, METAL_D)


def pickup_truck(d, u):
    """皮卡：蓝色车身 + 开放式车斗"""
    for wx in (36, 84):
        for wy in (40, 88):
            rr(d, u, wx, wy, 10, 19, 3, TIRE)
    rr(d, u, 42, 22, 44, 84, 10, BLUE)
    rr(d, u, 47, 24, 34, 19, 5, BLUE_LT)
    rr(d, u, 48, 44, 32, 12, 3, GLASS)
    rr(d, u, 50, 46, 12, 3, 1, (255, 255, 255, 60))
    rr(d, u, 46, 68, 36, 33, 4, BLUE_DK)
    for gy in (74, 82, 90):
        ln(d, u, [(49, gy), (79, gy)], "#3a7fc0", 2)
    rr(d, u, 50, 24, 4, 76, 2, (255, 255, 255, 40))


def dump_truck(d, u):
    """自卸卡车：红色驾驶室 + 黄色翻斗"""
    for wx in (36, 82):
        for wy in (36, 88):
            rr(d, u, wx, wy, 10, 20, 3, TIRE)
    rr(d, u, 38, 54, 52, 60, 4, YEL_DK)
    rr(d, u, 41, 57, 46, 52, 3, YELLOW)
    for i in range(5):
        ln(d, u, [(44 + i*9, 104), (50 + i*9, 60)], (0, 0, 0, 28), 6)
    rr(d, u, 42, 18, 44, 38, 9, RED)
    rr(d, u, 47, 20, 34, 12, 4, RED_LT)
    rr(d, u, 48, 32, 32, 13, 3, GLASS)
    rr(d, u, 50, 34, 13, 3, 1, (255, 255, 255, 60))
    rr(d, u, 46, 14, 36, 5, 2, METAL_D)


def container_truck(d, u):
    """集装箱拖车：蓝色拖头 + 锈红货柜"""
    for wx in (38, 84):
        for wy in (84, 106):
            rr(d, u, wx, wy, 9, 17, 2, TIRE)
    rr(d, u, 40, 50, 54, 44, 3, "#8f402d")
    rr(d, u, 43, 53, 48, 38, 2, RUST)
    for i in range(9):
        ln(d, u, [(46 + i*5.4, 55), (46 + i*5.4, 89)], (0, 0, 0, 30), 2)
    rr(d, u, 43, 22, 42, 36, 8, BLUE)
    rr(d, u, 48, 25, 32, 12, 3, BLUE_LT)
    rr(d, u, 49, 38, 30, 12, 3, GLASS)
    rr(d, u, 51, 40, 12, 3, 1, (255, 255, 255, 60))
    rr(d, u, 47, 17, 36, 5, 2, METAL_D)


def forklift(d, u):
    """叉车：黄色车身 + 顶部护架 + 前伸货叉（朝上）"""
    for wx in (40, 80):
        rr(d, u, wx, 60, 10, 20, 3, TIRE)
        rr(d, u, wx, 92, 10, 17, 3, TIRE)
    rr(d, u, 42, 90, 44, 16, 5, YEL_DK)          # 尾部配重
    rr(d, u, 44, 48, 40, 50, 8, YELLOW)          # 车身
    rr(d, u, 47, 52, 6, 42, 2, (255, 255, 255, 40))
    # 护顶架（俯视为方框，中间镂空）
    rr(d, u, 40, 34, 48, 48, 3, None, outline=METAL_D, ow=4)
    ln(d, u, [(40, 40), (88, 40)], METAL_D, 3)
    rr(d, u, 56, 62, 16, 20, 4, "#2f3338")       # 座椅
    el(d, u, 64, 58, 5, 4, METAL_D)              # 方向盘
    ln(d, u, [(48, 70), (48, 82)], "#9aa1a8", 2)  # 操纵杆
    rr(d, u, 45, 34, 38, 7, 2, METAL_D)          # 属具架（横向）
    rr(d, u, 47, 14, 10, 24, 1, METAL)           # 左货叉
    rr(d, u, 71, 14, 10, 24, 1, METAL)           # 右货叉
    rr(d, u, 47, 12, 34, 4, 1, "#9aa1a8")        # 叉尖横梁


def rowboat(d, u):
    """小木船：梭形船身 + 座板 + 木桨，船头朝上"""
    pg(d, u, [(64, 12), (84, 40), (86, 88), (64, 116), (42, 88), (44, 40)], WOOD_D)
    pg(d, u, [(64, 20), (78, 44), (80, 84), (64, 106), (48, 84), (50, 44)], "#a3835a")
    el(d, u, 64, 64, 12, 29, "#6b5438")
    rr(d, u, 50, 50, 28, 7, 2, WOOD_L)
    rr(d, u, 50, 78, 28, 7, 2, WOOD_L)
    ln(d, u, [(40, 74), (88, 58)], WOOD_L, 3)
    el(d, u, 38, 75, 5, 3, WOOD_L)
    el(d, u, 90, 57, 5, 3, WOOD_L)


def fishing_boat(d, u):
    """机动渔船：白色船身 + 驾驶舱 + 甲板设备"""
    pg(d, u, [(64, 10), (86, 36), (90, 92), (64, 118), (38, 92), (42, 36)], "#9aa1a8")
    pg(d, u, [(64, 15), (82, 39), (85, 89), (64, 112), (43, 89), (46, 39)], CREAM)
    pg(d, u, [(64, 20), (77, 43), (79, 85), (64, 105), (49, 85), (51, 43)], "#cfc9ba")
    rr(d, u, 52, 42, 24, 28, 4, "#f2eee2", outline="#b9b2a0", ow=1)
    rr(d, u, 55, 46, 18, 12, 2, GLASS)
    el(d, u, 64, 88, 8, 8, METAL_D)              # 舱口
    el(d, u, 64, 88, 4, 4, "#5f6a73")
    ln(d, u, [(64, 28), (64, 40)], METAL_D, 2)    # 桅杆
    el(d, u, 64, 26, 3, 3, METAL)


def speedboat(d, u):
    """快艇：流线型白蓝船身 + 深色座舱"""
    pg(d, u, [(64, 8), (82, 34), (86, 86), (64, 120), (42, 86), (46, 34)], "#1f5a75")
    pg(d, u, [(64, 14), (78, 38), (81, 83), (64, 112), (47, 83), (50, 38)], "#e8ecee")
    el(d, u, 64, 62, 12, 27, "#d3d9dc")
    el(d, u, 64, 58, 9, 18, GLASS)
    rr(d, u, 58, 88, 12, 12, 3, METAL_D)         # 舷外机
    rr(d, u, 56, 30, 16, 4, 2, "#2e6fb5")
    rr(d, u, 60, 22, 8, 6, 2, "#2e6fb5")


def flatbed(d, u):
    """平板拖车：灰色平板 + 板条 + 牵引杆"""
    for wx in (34, 84):
        for wy in (54, 94):
            rr(d, u, wx, wy, 10, 18, 3, TIRE)
    rr(d, u, 36, 42, 56, 66, 4, METAL_D)
    rr(d, u, 39, 45, 50, 60, 3, METAL)
    for gy in (52, 62, 72, 82, 92):
        ln(d, u, [(41, gy), (87, gy)], "#939ca5", 2)
    rr(d, u, 59, 20, 10, 24, 3, "#5f6a73")       # 牵引杆
    el(d, u, 64, 20, 6, 5, METAL)


def barrels(d, u):
    """油桶组：三个红色油桶 + 危险标识"""
    for cx, cy in ((46, 52), (82, 52), (64, 86)):
        el(d, u, cx, cy, 16, 16, "#7d2019")
        el(d, u, cx, cy-1, 14, 14, "#b3342a")
        el(d, u, cx-4, cy-5, 5, 4, (255, 255, 255, 55))
        pg(d, u, [(cx, cy-6), (cx+5, cy+4), (cx-5, cy+4)], "#f2c230")


def bollard(d, u):
    """系缆桩：俯视圆形铸铁桩"""
    el(d, u, 64, 66, 24, 19, "#2f3338")
    el(d, u, 64, 62, 21, 16, METAL_D)
    el(d, u, 64, 58, 16, 12, METAL)
    el(d, u, 58, 54, 6, 3, (255, 255, 255, 45))
    rc(d, u, 62, 44, 4, 32, "#3d4248")


def crane(d, u):
    """港口吊机：方形基座 + 转台 + 吊臂 + 配重"""
    rr(d, u, 40, 42, 48, 48, 6, METAL_D)
    rr(d, u, 45, 47, 38, 38, 4, METAL)
    el(d, u, 64, 66, 18, 18, "#8f98a1")
    el(d, u, 64, 66, 11, 11, "#5f6a73")
    rr(d, u, 62, 58, 48, 13, 3, YELLOW)          # 吊臂向右
    for i in range(4):
        ln(d, u, [(66 + i*11, 60), (72 + i*11, 70)], (0, 0, 0, 34), 2)
    rr(d, u, 30, 61, 30, 8, 2, YEL_DK)           # 配重臂
    rr(d, u, 30, 58, 10, 14, 2, METAL_D)
    el(d, u, 108, 64, 4, 4, METAL_D)             # 吊钩


ASSETS = [
    ("delivery_truck", "厢式货车", delivery_truck),
    ("pickup_truck", "皮卡车", pickup_truck),
    ("dump_truck", "自卸卡车", dump_truck),
    ("container_truck", "集装箱拖车", container_truck),
    ("rowboat", "小木船", rowboat),
    ("fishing_boat", "机动渔船", fishing_boat),
    ("speedboat", "快艇", speedboat),
    ("flatbed", "平板拖车", flatbed),
    ("barrels", "油桶组", barrels),
    ("bollard", "系缆桩", bollard),
    ("crane", "港口吊机", crane),
]


def build_asset(fn):
    """绘制单个资产，附加贴合轮廓的偏移阴影，输出透明底 RGBA。"""
    S = BASE * SS
    body = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(body)
    u = lambda v: int(round(v * SS))
    fn(d, u)

    pad = int(18 * SS)
    shadow = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    shadow.putalpha(body.getchannel("A").point(lambda v: int(v * 0.32)))

    canvas = Image.new("RGBA", (S + pad*2, S + pad*2), (0, 0, 0, 0))
    canvas.alpha_composite(shadow, (pad + int(5*SS), pad + int(7*SS)))
    canvas.alpha_composite(body, (pad, pad))
    out = canvas.resize(((BASE + 36) * 2, (BASE + 36) * 2), Image.LANCZOS)
    return out


def font(size, bold=False):
    try:
        return ImageFont.truetype(FONT_BOLD if bold else FONT_PATH, size)
    except Exception:
        return ImageFont.load_default()


def make_preview(images):
    rows = (len(images) + COLS - 1) // COLS
    title_h, foot_h = 96, 74
    W = COLS * CELL_W + 40
    H = title_h + rows * CELL_H + foot_h
    sheet = Image.new("RGB", (W, H), "#eef1f3")
    d = ImageDraw.Draw(sheet)

    d.rectangle([0, 0, W, title_h], fill="#243138")
    d.text((24, 16), "俯视角美术资产审查图", font=font(30, True), fill="#ffffff")
    d.text((24, 56), "车头 / 船头朝画面上方 · 正俯视视角 · 扁平卡通风格（对齐游戏 render.ts）",
           font=font(16), fill="#bfd0d8")

    f_name = font(17, True)
    f_id = font(12)
    for i, (aid, name, _fn) in enumerate(ASSETS):
        r, c = divmod(i, COLS)
        x0 = 20 + c * CELL_W
        y0 = title_h + r * CELL_H
        # 棋盘格底，便于看清透明区域
        for by in range(TILE // 16 + 1):
            for bx in range(TILE // 16 + 1):
                shade = "#dfe4e7" if (bx + by) % 2 == 0 else "#f4f6f7"
                d.rectangle([x0 + bx*16, y0 + by*16, x0 + bx*16+16, y0 + by*16+16], fill=shade)
        img = images[aid].copy()
        img.thumbnail((TILE, TILE), Image.LANCZOS)
        sheet.paste(img, (x0 + (TILE - img.width)//2, y0 + (TILE - img.height)//2), img)
        d.text((x0 + 6, y0 + TILE + 4), f"{name}", font=f_name, fill="#1d2a30")
        d.text((x0 + 6, y0 + TILE + 26), aid, font=f_id, fill="#6d7d85")

    fy = title_h + rows * CELL_H + 12
    d.line([(20, fy - 4), (W - 20, fy - 4)], fill="#c7d0d5", width=1)
    d.text((24, fy + 6), "说明：PNG 为透明背景 328×328；接入游戏时按碰撞盒尺寸缩放，可整体旋转 90° 适配横向摆放。",
           font=font(15), fill="#40525b")
    d.text((24, fy + 30), "本轮仅生成资产供审查，未接入游戏逻辑；海港地图误加的加油站 / 汽车已移除。",
           font=font(15), fill="#40525b")
    return sheet


def main():
    images = {}
    for aid, _name, fn in ASSETS:
        img = build_asset(fn)
        img.save(os.path.join(OUT_DIR, aid + ".png"))
        images[aid] = img
        print("saved", aid + ".png", img.size)
    sheet = make_preview(images)
    preview = os.path.join(os.path.dirname(OUT_DIR), "preview.png")
    sheet.save(preview)
    print("saved preview.png", sheet.size)


if __name__ == "__main__":
    main()
