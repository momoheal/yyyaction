from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parent
SCALE = 3
SIZE = 256

INK = '#242c2d'
EDGE = '#30393a'
STONE = '#9b988a'
STONE_LIGHT = '#c9c4b2'
STONE_DARK = '#6c716c'
WOOD = '#9a7047'
WOOD_LIGHT = '#c49a65'
WOOD_DARK = '#5c412d'


def xy(value):
    return round(value * SCALE)


def box(values):
    return tuple(xy(value) for value in values)


def canvas():
    return Image.new('RGBA', (xy(SIZE), xy(SIZE)), (0, 0, 0, 0))


def polygon(draw, points, fill, outline=INK, width=2):
    pts = [(xy(x), xy(y)) for x, y in points]
    draw.polygon(pts, fill=fill)
    if outline:
        draw.line(pts + [pts[0]], fill=outline, width=xy(width), joint='curve')


def rounded(draw, bounds, radius, fill, outline=INK, width=2):
    draw.rounded_rectangle(box(bounds), radius=xy(radius), fill=fill,
                           outline=outline, width=xy(width) if outline else 1)


def ellipse(draw, bounds, fill, outline=None, width=1):
    draw.ellipse(box(bounds), fill=fill, outline=outline,
                 width=xy(width) if outline else 1)


def line(draw, points, fill, width=2):
    draw.line([(xy(x), xy(y)) for x, y in points], fill=fill,
              width=xy(width), joint='curve')


def arc(draw, bounds, start, end, fill, width=2):
    draw.arc(box(bounds), start=start, end=end, fill=fill, width=xy(width))


def shadow(img, bounds, alpha=90, blur=10):
    layer = Image.new('RGBA', img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.ellipse(box(bounds), fill=(0, 0, 0, alpha))
    layer = layer.filter(ImageFilter.GaussianBlur(xy(blur)))
    img.alpha_composite(layer)


def fountain():
    im = canvas(); d = ImageDraw.Draw(im)
    shadow(im, (28, 170, 226, 238), 105, 10); d = ImageDraw.Draw(im)
    polygon(d, [(50, 84), (84, 62), (175, 62), (207, 86), (221, 162),
                (194, 207), (66, 207), (37, 163)], '#777a73', '#283132', 4)
    polygon(d, [(58, 87), (88, 72), (171, 72), (198, 91), (209, 157),
                (186, 192), (73, 192), (50, 158)], STONE_LIGHT, '#5b625f', 3)
    polygon(d, [(70, 95), (94, 83), (166, 83), (187, 98), (195, 151),
                (175, 178), (82, 178), (63, 151)], '#5797a9', '#536a6c', 3)
    ellipse(d, (78, 98, 180, 169), '#72afbb')
    ellipse(d, (92, 109, 166, 157), '#649eac')
    arc(d, (83, 111, 126, 145), 205, 335, '#b7e4e5', 2)
    arc(d, (137, 125, 178, 158), 20, 150, '#c2e7e7', 2)
    # Central plinth and a simple duck-head fountain nozzle, without a crown.
    ellipse(d, (99, 75, 157, 134), '#777b72', '#444b49', 3)
    ellipse(d, (105, 77, 151, 123), '#c2bdad', '#646a65', 3)
    ellipse(d, (114, 83, 143, 111), '#dfd7c0', '#766f5b', 2)
    ellipse(d, (119, 90, 122, 94), '#34393a')
    ellipse(d, (135, 90, 138, 94), '#34393a')
    ellipse(d, (121, 96, 136, 103), '#ca8e48', '#70583b', 1)
    return im


def duck_king_statue():
    im = canvas(); d = ImageDraw.Draw(im)
    shadow(im, (42, 188, 214, 230), 100, 9); d = ImageDraw.Draw(im)
    # Rounded plinth and a simple, forward-facing duck silhouette.
    ellipse(d, (38, 49, 218, 211), '#666b66', '#303837', 4)
    ellipse(d, (47, 54, 209, 202), '#aaa797', '#74776d', 3)
    ellipse(d, (57, 63, 199, 193), '#c2bdac', '#77796f', 2)
    ellipse(d, (79, 98, 177, 176), '#99998d', '#666b65', 3)
    ellipse(d, (88, 111, 113, 151), '#85877c')
    ellipse(d, (143, 111, 168, 151), '#85877c')
    ellipse(d, (91, 58, 165, 128), '#d2cbb8', '#77796f', 3)
    # Three rounded crown knobs keep the royal cue soft and readable.
    rounded(d, (99, 61, 157, 72), 5, '#b79854', '#6b5837', 2)
    for x, y, r in [(108, 61, 8), (128, 53, 10), (148, 61, 8)]:
        ellipse(d, (x - r, y - r, x + r, y + r), '#c6aa68', '#75613c', 2)
    ellipse(d, (106, 80, 112, 86), '#393e3d')
    ellipse(d, (144, 80, 150, 86), '#393e3d')
    ellipse(d, (114, 93, 142, 108), '#b99d6d', '#76654b', 2)
    # A single inset belly and a few stone flecks replace busy carved grooves.
    ellipse(d, (104, 120, 152, 163), '#b0ad9e')
    for x, y in [(69, 104), (187, 107), (72, 164), (184, 164)]:
        ellipse(d, (x - 2, y - 2, x + 2, y + 2), '#929286')
    return im


def billboard():
    im = canvas(); d = ImageDraw.Draw(im)
    shadow(im, (44, 174, 216, 223), 100, 8); d = ImageDraw.Draw(im)
    # A simple sign board on two short, sturdy supports.
    rounded(d, (66, 148, 91, 185), 6, '#555c58', '#303635', 2)
    rounded(d, (165, 148, 190, 185), 6, '#555c58', '#303635', 2)
    rounded(d, (54, 171, 100, 192), 7, '#434a47', '#303635', 2)
    rounded(d, (156, 171, 202, 192), 7, '#434a47', '#303635', 2)
    rounded(d, (35, 39, 221, 151), 12, '#382e35', '#232a2b', 4)
    rounded(d, (44, 47, 212, 140), 8, '#e1b957', '#765a2e', 3)
    rounded(d, (51, 54, 205, 132), 5, '#42645b', '#2d4642', 2)
    # Rounded duck mark, readable copy and one quiet sign accent.
    ellipse(d, (63, 66, 111, 114), '#f0d485', '#8f7038', 2)
    ellipse(d, (73, 72, 103, 103), '#f6c94f', '#715c35', 2)
    ellipse(d, (79, 82, 82, 85), '#263335')
    ellipse(d, (94, 82, 97, 85), '#263335')
    ellipse(d, (83, 89, 99, 98), '#d98436', '#71533a', 1)
    font = ImageFont.truetype(r'C:\Windows\Fonts\msyhbd.ttc', xy(20))
    d.text((xy(117), xy(67)), '鸭鸭补给', font=font, fill='#fff1c6', stroke_width=xy(0.4), stroke_fill='#334943')
    d.rounded_rectangle(box((119, 98, 187, 103)), radius=xy(2), fill='#d2b56b')
    d.rounded_rectangle(box((119, 109, 175, 113)), radius=xy(2), fill='#d2b56b')
    for x in (58, 192): ellipse(d, (x - 3, 43, x + 3, 49), '#fff0a6')
    return im


def vending_machine():
    im = canvas(); d = ImageDraw.Draw(im)
    shadow(im, (47, 182, 210, 229), 110, 9); d = ImageDraw.Draw(im)
    # Heavy shell with a narrow side face for readable depth.
    polygon(d, [(62, 28), (192, 28), (211, 43), (211, 210), (192, 225), (62, 225)], '#263c40', '#172527', 4)
    polygon(d, [(192, 28), (211, 43), (211, 210), (192, 225)], '#182a2e', '#172527', 3)
    rounded(d, (69, 36, 187, 215), 9, '#44656a', '#152629', 3)
    rounded(d, (78, 47, 150, 151), 6, '#182f35', '#91b5b3', 2)
    # Lit product window with visible cans and bottles.
    for row, y in enumerate((58, 87, 116)):
        for col, x in enumerate((89, 111, 133)):
            fill = ['#d9684e', '#e3bd5b', '#68a9a0'][(row + col) % 3]
            rounded(d, (x, y, x + 13, y + 22), 4, fill, '#1e3335', 1)
            line(d, [(x + 3, y + 5), (x + 10, y + 5)], '#fff0cd', 1)
            ellipse(d, (x + 5, y + 1, x + 8, y + 3), '#d8d6c7')
    rounded(d, (156, 50, 179, 150), 4, '#cad0bd', '#263839', 2)
    for y in (63, 81, 99, 117, 135):
        ellipse(d, (164, y, 170, y + 6), '#e0bd67', '#394a47', 1)
    rounded(d, (83, 162, 173, 185), 5, '#26383a', '#a9b6a6', 2)
    rounded(d, (105, 192, 156, 205), 4, '#18292b', '#789494', 2)
    # Small green search glint is part of the proposal badge, not the machine body.
    ellipse(d, (174, 187, 191, 204), '#83d39b', '#24483d', 2)
    ellipse(d, (179, 192, 185, 198), '#e7ffd9')
    return im


def bed():
    im = canvas(); d = ImageDraw.Draw(im)
    shadow(im, (38, 196, 222, 232), 95, 9); d = ImageDraw.Draw(im)
    rounded(d, (44, 30, 212, 222), 16, WOOD_DARK, '#282d2b', 4)
    rounded(d, (51, 37, 205, 215), 13, WOOD, '#644a32', 3)
    rounded(d, (60, 45, 196, 207), 10, '#e3dfd2', '#77776c', 2)
    # Headboard and pillow make the bed orientation clear at a glance.
    rounded(d, (62, 46, 194, 72), 8, '#b18a5b', '#765438', 2)
    rounded(d, (73, 76, 183, 111), 10, '#f2ede0', '#b0ad9e', 2)
    line(d, [(84, 93), (172, 93)], '#d6d1c4', 1)
    rounded(d, (67, 116, 189, 198), 12, '#738268', '#4d5b4b', 2)
    rounded(d, (74, 122, 182, 190), 9, '#849176')
    line(d, [(82, 128), (174, 128)], '#9ba48a', 2)
    for x in (59, 197):
        for y in (48, 207): ellipse(d, (x - 3, y - 3, x + 3, y + 3), '#d0aa70')
    return im


def table_base():
    im = canvas(); d = ImageDraw.Draw(im)
    shadow(im, (34, 179, 224, 227), 100, 10); d = ImageDraw.Draw(im)
    # Four feet protrude beyond a broad, uncluttered tabletop.
    for x, y in ((52, 52), (204, 52), (52, 188), (204, 188)):
        rounded(d, (x - 14, y - 14, x + 14, y + 14), 6, WOOD_DARK, '#302a24', 2)
    rounded(d, (51, 49, 205, 191), 14, '#5c412d', '#302a24', 4)
    rounded(d, (58, 56, 198, 184), 11, '#a77d50', '#674a31', 3)
    rounded(d, (66, 64, 190, 176), 8, '#b88c5b')
    line(d, [(81, 78), (175, 78)], '#c69b68', 2)
    return im, ImageDraw.Draw(im)


def draw_map_sheet(d, bounds=(76, 91, 149, 155)):
    x1, y1, x2, y2 = bounds
    rounded(d, bounds, 5, '#e4ddc6', '#685b45', 2)
    line(d, [((x1 + x2) / 2, y1 + 3), ((x1 + x2) / 2, y2 - 3)], '#bdb39a', 1)
    line(d, [(x1 + 5, (y1 + y2) / 2), (x2 - 5, (y1 + y2) / 2)], '#bdb39a', 1)
    line(d, [(x1 + 11, y1 + 48), (x1 + 23, y1 + 35), (x1 + 38, y1 + 39), (x1 + 54, y1 + 19)], '#64826b', 2)
    ellipse(d, (x1 + 48, y1 + 14, x1 + 56, y1 + 22), '#c76b4e', '#805441', 1)


def draw_mug(d, x=164, y=104, color='#e8e0ce'):
    ellipse(d, (x - 5, y - 5, x + 29, y + 29), '#c6a77c')
    rounded(d, (x, y, x + 24, y + 25), 5, color, '#685b45', 2)
    rounded(d, (x + 5, y + 4, x + 20, y + 7), 2, '#846f55')
    ellipse(d, (x + 20, y + 7, x + 31, y + 19), '#c6a77c', '#685b45', 2)
    ellipse(d, (x + 22, y + 9, x + 28, y + 17), '#111719')


def table_map_cup():
    im, d = table_base()
    draw_map_sheet(d)
    draw_mug(d)
    return im


def table_field_kit():
    im, d = table_base()
    draw_map_sheet(d, (73, 95, 132, 151))
    draw_mug(d, 159, 126, '#b9c6bd')
    # A compact radio and one antenna sit beside the map.
    rounded(d, (140, 88, 164, 121), 5, '#455e58', '#293b37', 2)
    rounded(d, (145, 93, 159, 105), 3, '#c5c7ae')
    line(d, [(153, 92), (160, 78)], '#293b37', 2)
    ellipse(d, (144, 109, 149, 114), '#d2b56b')
    return im


def chair_wood():
    im = canvas(); d = ImageDraw.Draw(im)
    shadow(im, (50, 178, 206, 224), 90, 9); d = ImageDraw.Draw(im)
    # Strong U-shaped back and side rails make the chair silhouette unmistakable.
    for x in (76, 180):
        rounded(d, (x - 8, 63, x + 8, 191), 5, WOOD_DARK, '#302a24', 2)
    rounded(d, (56, 28, 200, 88), 19, WOOD_DARK, '#302a24', 4)
    rounded(d, (65, 37, 191, 77), 15, '#b08552', '#765438', 2)
    for x in (104, 152): rounded(d, (x - 3, 42, x + 3, 70), 3, WOOD_LIGHT)
    rounded(d, (67, 88, 189, 190), 19, '#5c412d', '#302a24', 4)
    rounded(d, (77, 98, 179, 179), 14, '#bd9463', '#765438', 2)
    rounded(d, (88, 109, 168, 166), 12, '#d0ab7c')
    for x in (76, 180):
        for y in (91, 185): ellipse(d, (x - 7, y - 7, x + 7, y + 7), WOOD_DARK, '#302a24', 2)
    return im


def chair_folding():
    im = canvas(); d = ImageDraw.Draw(im)
    shadow(im, (54, 178, 202, 224), 85, 8); d = ImageDraw.Draw(im)
    # Tubular frame, open back, and canvas seat distinguish a folding field chair.
    rounded(d, (65, 28, 191, 82), 16, '#3f4a48', '#25302f', 4)
    rounded(d, (74, 36, 182, 74), 12, '#7f8d75', '#4c5b4d', 2)
    rounded(d, (72, 87, 184, 181), 14, '#3f4a48', '#25302f', 4)
    rounded(d, (82, 96, 174, 171), 10, '#a3a17c', '#58624d', 2)
    line(d, [(78, 89), (64, 187)], '#626d68', 6)
    line(d, [(178, 89), (192, 187)], '#626d68', 6)
    line(d, [(71, 175), (185, 175)], '#626d68', 6)
    return im


def chair_armchair():
    im = canvas(); d = ImageDraw.Draw(im)
    shadow(im, (43, 180, 213, 228), 95, 10); d = ImageDraw.Draw(im)
    # Broad padded arms, a tall back cushion, and a separate seat cushion.
    rounded(d, (50, 31, 206, 216), 28, '#514537', '#2d2c28', 4)
    rounded(d, (63, 42, 193, 102), 21, '#a27c52', '#6d5337', 3)
    rounded(d, (61, 92, 88, 191), 13, '#765b3d', '#4d3d2c', 2)
    rounded(d, (168, 92, 195, 191), 13, '#765b3d', '#4d3d2c', 2)
    rounded(d, (83, 105, 173, 191), 19, '#c19b6c', '#765b3d', 3)
    rounded(d, (93, 116, 163, 181), 16, '#d1b287')
    return im


def bedside_cabinet():
    im = canvas(); d = ImageDraw.Draw(im)
    shadow(im, (46, 177, 210, 222), 90, 8); d = ImageDraw.Draw(im)
    for x, y in ((66, 58), (190, 58), (66, 184), (190, 184)):
        rounded(d, (x - 8, y - 8, x + 8, y + 8), 4, WOOD_DARK, '#302a24', 2)
    rounded(d, (51, 42, 205, 195), 14, WOOD_DARK, '#302a24', 4)
    rounded(d, (59, 50, 197, 187), 11, WOOD, '#674a31', 2)
    rounded(d, (70, 62, 186, 115), 8, '#c39762', '#765438', 2)
    rounded(d, (70, 124, 186, 174), 8, '#b78957', '#765438', 2)
    ellipse(d, (123, 82, 133, 92), '#574331')
    ellipse(d, (123, 143, 133, 153), '#574331')
    return im


def potted_flower():
    im = canvas(); d = ImageDraw.Draw(im)
    shadow(im, (55, 177, 201, 223), 85, 8); d = ImageDraw.Draw(im)
    ellipse(d, (57, 39, 199, 179), '#475a45', '#283b34', 3)
    ellipse(d, (67, 49, 189, 169), '#66805a')
    for bounds, color in [((79, 72, 130, 112), '#81996b'), ((119, 91, 169, 132), '#8ba06e'), ((82, 116, 128, 151), '#91a374'), ((128, 59, 165, 99), '#738b62')]:
        ellipse(d, bounds, color, '#566d4c', 2)
    ellipse(d, (105, 77, 151, 123), '#edc85d', '#9b763d', 2)
    for x, y in ((128, 69), (128, 131), (97, 100), (159, 100)):
        ellipse(d, (x - 12, y - 9, x + 12, y + 9), '#f0d77a', '#a88545', 1)
    ellipse(d, (121, 93, 137, 109), '#c67a43', '#7c4e32', 2)
    return im


ASSETS = [
    ('喷泉', '石砌水池 · 装饰地标', fountain),
    ('鸭鸭国王石雕', '王陵庭院 · 石材雕像', duck_king_statue),
    ('广告牌', '道路边 · 鸭鸭补给', billboard),
    ('贩卖机', '可搜刮 · 饮料与杂物', vending_machine),
    ('床', '室内家具 · 可旋转摆放', bed),
    ('桌子 A', '摊开地图 · 搪瓷杯', table_map_cup),
    ('桌子 B', '地图 · 水壶杯 · 对讲机', table_field_kit),
    ('木椅', '高靠背 · 扶手木椅', chair_wood),
    ('折叠椅', '帆布座面 · 露营款', chair_folding),
    ('软包椅', '宽扶手 · 室内休息椅', chair_armchair),
    ('床头柜', '双抽屉 · 简洁木柜', bedside_cabinet),
    ('盆栽花', '室内绿植 · 暖色花朵', potted_flower),
]


def main():
    width, height = 1360, 1010
    sheet = Image.new('RGB', (width, height), '#111719')
    d = ImageDraw.Draw(sheet)
    title = ImageFont.truetype(r'C:\Windows\Fonts\msyhbd.ttc', 32)
    sub = ImageFont.truetype(r'C:\Windows\Fonts\msyh.ttc', 15)
    label = ImageFont.truetype(r'C:\Windows\Fonts\msyhbd.ttc', 19)
    note = ImageFont.truetype(r'C:\Windows\Fonts\msyh.ttc', 13)
    d.text((34, 18), '鸭鸭鸭行动 · 程序化场景资产提案 v3', font=title, fill='#f0d17a')
    d.text((36, 58), '俯视角 / Canvas 几何绘制 / 家具方案对比 / 仅供验收，尚未接入地图', font=sub, fill='#aab8b5')
    card_w, card_h, gap = 310, 282, 16
    start_x, start_y = 30, 92
    for i, (name, description, draw_asset) in enumerate(ASSETS):
        col, row = i % 4, i // 4
        x = start_x + col * (card_w + gap)
        y = start_y + row * (card_h + gap)
        d.rounded_rectangle((x, y, x + card_w, y + card_h), radius=16,
                            fill='#1a2224', outline='#354144', width=2)
        d.rounded_rectangle((x + 10, y + 10, x + card_w - 10, y + 220), radius=12,
                            fill='#202a2c', outline='#2e3b3d', width=1)
        art = draw_asset().resize((xy(SIZE), xy(SIZE)), Image.Resampling.LANCZOS)
        art.thumbnail((198, 198), Image.Resampling.LANCZOS)
        # The review sheet is rendered at native resolution; the 3x asset
        # drawing is reduced to its in-game preview size before compositing.
        dest = (x + (card_w - art.width) // 2, y + 18)
        sheet_rgba = sheet.convert('RGBA')
        sheet_rgba.alpha_composite(art, dest)
        sheet = sheet_rgba.convert('RGB')
        d = ImageDraw.Draw(sheet)
        d.text((x + 18, y + 225), name, font=label, fill='#f0e8d3')
        d.text((x + 18, y + 253), description, font=note, fill='#aab8b5')

    output = ROOT / 'props-proposal-v3.png'
    sheet.save(output, optimize=True)
    print(output)


if __name__ == '__main__':
    main()
