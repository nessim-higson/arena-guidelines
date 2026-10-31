# Rebuilds the Metal Slug examples (assets/slides p-14, 15, 65 to 68) with the new SV-001 wordmark over Secret Level art.
# Reads ../arena-ip (wordmarks, SV001 font, hero art). Usage: python3 tools/metal-slug-examples.py <out dir>; then copy the PNGs into assets/slides.
# p-27 (materials) is ../arena-ip/assets/renders/ms-x-pour.jpg scaled to 1500 and cropped to 1500x844.

import os, re, subprocess, sys
P=os.path.expanduser("~/CLAUDE/projects/prototypes"); S=sys.argv[1]
H=f"{P}/arena-ip/assets/hero"; OLD=f"{P}/arena-guidelines/assets/slides"
def svg(path, h=None, w=None):
    s=open(path).read(); s=re.sub(r'<\?xml[^>]*>','',s); s=re.sub(r'\swidth="[^"]*"\s+height="[^"]*"','',s,count=1)
    size=(f'height="{h}"' if h else '')+(f' width="{w}"' if w else '')
    return s.replace('<svg ', f'<svg {size} style="display:block" ',1)
MS=f"{P}/arena-ip/assets/vec/metal-slug.svg"; MSL=f"{P}/arena-ip/assets/vec/metal-slug-line.svg"; AR=f"{P}/arena-guidelines/assets/logo/lockup-horizontal.svg"
CREAM="#EDE8DC"
base=f"""<!doctype html><meta charset=utf-8><style>
@font-face{{font-family:SV;src:url(file://{P}/arena-ip/assets/fonts/SV001.woff2)}}
*{{margin:0;box-sizing:border-box}} html,body{{width:1500px;height:844px;background:#000;overflow:hidden;color:{CREAM}}}
.c{{display:grid;place-items:center;justify-content:center}} .bg{{position:absolute;inset:0;background-size:cover}}
.scrim{{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.25),rgba(0,0,0,.05) 35%,rgba(0,0,0,.15) 60%,rgba(0,0,0,.7))}}
.mark{{filter:drop-shadow(0 4px 24px rgba(0,0,0,.45))}}
</style>"""
def keyart(img,pos):
    return base+f"""<div class=bg style="background-image:url(file://{H}/{img}.jpg);background-position:{pos}"></div><div class=scrim></div>
<div class=mark style="position:absolute;left:50%;top:44%;transform:translate(-50%,-50%)">{svg(MSL,w=640)}</div>
<div style="position:absolute;left:50%;bottom:48px;transform:translateX(-50%)">{svg(AR,h=34)}</div>"""
def poster(img,pos):
    return f"""<div style="position:relative;width:300px;height:444px;overflow:hidden"><div class=bg style="background-image:url(file://{H}/{img}.jpg);background-position:{pos}"></div><div class=scrim></div>
<div class=mark style="position:absolute;left:50%;top:48%;transform:translate(-50%,-50%)">{svg(MS,w=230)}</div>
<div style="position:absolute;left:50%;bottom:22px;transform:translateX(-50%)">{svg(AR,h=11)}</div></div>"""
def arena(src,x): return f'<div style="width:300px;height:444px;background:url(file://{OLD}/{src}) -{x}px -200px no-repeat"></div>'
MSP=[poster("ms-sl-crew","32% 50%"),poster("ms-sl-battle","58% 50%"),poster("ms-sl-jungle","62% 50%")]
def strip(src): return base+f'<div style="position:absolute;top:200px;left:0;display:flex">{MSP[0]}{arena(src,300)}{MSP[1]}{arena(src,900)}{MSP[2]}</div>'
pages={
 "p-65": keyart("ms-sl-island","center 55%"),
 "p-66": keyart("ms-sl-desert","center 40%"),
 "p-14": base+f"""<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:space-around;padding:0 120px">
   <div style="display:grid;justify-items:center;gap:26px">{svg(MS,w=300)}{svg(AR,h=24)}</div>
   <div style="display:grid;justify-items:center;gap:26px">{svg(MSL,w=520)}{svg(AR,h=26)}</div></div>""",
 "p-15": base+f"""<div style="position:absolute;inset:0;display:grid;place-content:center;justify-items:center;gap:0">
   <div style="margin-bottom:22px">{svg(MSL,h=34)}</div>
   <div style="font:400 126px/0.8 SV;letter-spacing:0;font-kerning:normal">DEATH <span style="margin-right:-.15em">V</span>ALLEY</div>
   <div style="margin-top:40px">{svg(AR,h=28)}</div></div>""",
 "p-68": strip("p-68.png"),
 "p-67": strip("p-67.png"),
}
C="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
for k,v in pages.items():
    open(f"{S}/{k}.html","w").write(v)
    subprocess.run([C,"--headless=new","--disable-gpu","--hide-scrollbars","--allow-file-access-from-files","--virtual-time-budget=3000",f"--screenshot={S}/{k}.png","--window-size=1500,844",f"file://{S}/{k}.html"],stderr=subprocess.DEVNULL,stdout=subprocess.DEVNULL)
    print(k, os.path.getsize(f"{S}/{k}.png"))
