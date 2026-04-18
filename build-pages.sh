#!/usr/bin/env bash
# Build per-page HTML files from index.html (HE) and index-en.html (EN).
# Each generated file: shared head + nav + mobile menu + ONE page + footer + scripts.
# All onclick="go('xxx',event)" rewritten to href="xxx.html" (or *-en.html for EN).
set -e
cd "$(dirname "$0")"

# ===== Hebrew pages =====
# id|start|end|title
HE_PAGES=(
  "about|693|739|אודות"
  "agropriority|740|808|AgroPriority"
  "agrotalk|809|875|AgroTalk"
  "agrosmart|876|939|AgroSmart"
  "agroqc|940|1003|AgroQC"
  "agroshop|1004|1064|AgroShop"
  "customers|1065|1080|הלקוחות שלנו"
  "news|1081|1201|חדשות ועדכונים"
  "news-agrostore|1202|1253|AgroStore B2B"
  "news-growers-link|1254|1292|קישור מגדלים"
  "news-agrotalk-updates|1293|1332|עדכוני AgroTalk"
  "news-api-dev|1333|1373|ממשקי API"
  "news-receipt|1374|1400|קליטת תעודות"
  "news-agriculture|1401|1434|ממשק חקלאות"
  "news-customs|1435|1461|עמילי מכס"
  "news-bt9|1462|1489|מודול BT9"
  "news-agroqc|1490|1529|AgroQC חדשות"
  "contact|1530|1563|יצירת קשר"
  "accessibility|1564|1623|הצהרת נגישות"
  "privacy|1624|1710|מדיניות פרטיות"
)

for entry in "${HE_PAGES[@]}"; do
  IFS='|' read -r id start end title <<< "$entry"
  out="${id}.html"
  {
    sed -n '1,540p' index.html
    sed -n '542,594p' index.html
    echo ""
    sed -n "${start},${end}p" index.html
    sed -n '1712,$p' index.html
  } > "$out"

  TITLE="$title" ID="$id" perl -i -CSD -pe '
    BEGIN { $t = $ENV{TITLE}; $i = $ENV{ID}; }
    s|<title>בית - אגרוסופט בע"מ</title>|<title>${t} - אגרוסופט בע"מ</title>|;
    s|<div id="\Q${i}\E" class="page">|<div id="${i}" class="page active">|;
  ' "$out"

  perl -i -CSD -pe '
    s|<a href="#" onclick="go\(\x27home\x27,event\);setTimeout\(\(\)=>\{const el=document\.getElementById\(\x27products-section\x27\);if\(el\)el\.scrollIntoView\(\{behavior:\x27smooth\x27\}\)\},100\);return false;">|<a href="index.html#products-section">|g;
    s|href="#" onclick="closeMobileMenu\(\);return go\(\x27([a-z][a-z0-9-]*)\x27,event\)"|href="$1.html"|g;
    s|href="#" onclick="closeA11y\(\);return go\(\x27([a-z][a-z0-9-]*)\x27,event\)"|href="$1.html"|g;
    s|href="#" onclick="return go\(\x27([a-z][a-z0-9-]*)\x27,event\)"|href="$1.html"|g;
    s|href="home\.html"|href="index.html"|g;
  ' "$out"
  echo "  HE  $out"
done

# ===== English pages =====
EN_PAGES=(
  "about|654|700|About"
  "agropriority|701|769|AgroPriority"
  "agrotalk|770|833|AgroTalk"
  "agrosmart|834|897|AgroSmart"
  "agroqc|898|961|AgroQC"
  "agroshop|962|1022|AgroShop"
  "customers|1023|1038|Our Clients"
  "news|1039|1133|News &amp; Updates"
  "news-agrostore|1134|1163|AgroStore B2B"
  "news-growers-link|1164|1188|Growers Link"
  "news-agrotalk-updates|1189|1219|AgroTalk Updates"
  "news-api-dev|1220|1246|API Development"
  "news-receipt|1247|1270|Receipts Interface"
  "news-agriculture|1271|1301|Ministry of Agriculture"
  "news-customs|1302|1325|Customs Brokers"
  "news-bt9|1326|1350|BT9 Module"
  "news-agroqc|1351|1381|AgroQC News"
  "contact|1382|1415|Contact"
  "accessibility|1416|1475|Accessibility"
  "privacy|1476|1563|Privacy Policy"
)

for entry in "${EN_PAGES[@]}"; do
  IFS='|' read -r id start end title <<< "$entry"
  out="${id}-en.html"
  {
    sed -n '1,502p' index-en.html
    sed -n '504,556p' index-en.html
    echo ""
    sed -n "${start},${end}p" index-en.html
    sed -n '1565,$p' index-en.html
  } > "$out"

  TITLE="$title" ID="$id" perl -i -CSD -pe '
    BEGIN { $t = $ENV{TITLE}; $i = $ENV{ID}; }
    s|<title>Home - AgroSoft Ltd\.</title>|<title>${t} - AgroSoft Ltd.</title>|;
    s|<div id="\Q${i}\E" class="page">|<div id="${i}" class="page active">|;
  ' "$out"

  # In EN files: rewrite go() → <id>-en.html, but home → index-en.html
  perl -i -CSD -pe '
    s|<a href="#" onclick="go\(\x27home\x27,event\);setTimeout\(\(\)=>\{const el=document\.getElementById\(\x27products-section\x27\);if\(el\)el\.scrollIntoView\(\{behavior:\x27smooth\x27\}\)\},100\);return false;">|<a href="index-en.html#products-section">|g;
    s|href="#" onclick="closeMobileMenu\(\);return go\(\x27home\x27,event\)"|href="index-en.html"|g;
    s|href="#" onclick="closeA11y\(\);return go\(\x27home\x27,event\)"|href="index-en.html"|g;
    s|href="#" onclick="return go\(\x27home\x27,event\)"|href="index-en.html"|g;
    s|href="#" onclick="closeMobileMenu\(\);return go\(\x27([a-z][a-z0-9-]*)\x27,event\)"|href="$1-en.html"|g;
    s|href="#" onclick="closeA11y\(\);return go\(\x27([a-z][a-z0-9-]*)\x27,event\)"|href="$1-en.html"|g;
    s|href="#" onclick="return go\(\x27([a-z][a-z0-9-]*)\x27,event\)"|href="$1-en.html"|g;
  ' "$out"
  echo "  EN  $out"
done

# ===== Trim index.html (HE home) =====
{
  sed -n '1,540p' index.html
  sed -n '542,594p' index.html
  echo ""
  sed -n '601,692p' index.html
  sed -n '1712,$p' index.html
} > index.html.new
perl -i -CSD -pe '
  s|<a href="#" onclick="go\(\x27home\x27,event\);setTimeout\(\(\)=>\{const el=document\.getElementById\(\x27products-section\x27\);if\(el\)el\.scrollIntoView\(\{behavior:\x27smooth\x27\}\)\},100\);return false;">|<a href="index.html#products-section">|g;
  s|href="#" onclick="closeMobileMenu\(\);return go\(\x27([a-z][a-z0-9-]*)\x27,event\)"|href="$1.html"|g;
  s|href="#" onclick="closeA11y\(\);return go\(\x27([a-z][a-z0-9-]*)\x27,event\)"|href="$1.html"|g;
  s|href="#" onclick="return go\(\x27([a-z][a-z0-9-]*)\x27,event\)"|href="$1.html"|g;
  s|href="home\.html"|href="index.html"|g;
' index.html.new
mv index.html.new index.html
echo "  HE  index.html (trimmed to home)"

# ===== Trim index-en.html (EN home) =====
{
  sed -n '1,502p' index-en.html
  sed -n '504,556p' index-en.html
  echo ""
  sed -n '563,653p' index-en.html
  sed -n '1565,$p' index-en.html
} > index-en.html.new
perl -i -CSD -pe '
  s|<a href="#" onclick="go\(\x27home\x27,event\);setTimeout\(\(\)=>\{const el=document\.getElementById\(\x27products-section\x27\);if\(el\)el\.scrollIntoView\(\{behavior:\x27smooth\x27\}\)\},100\);return false;">|<a href="index-en.html#products-section">|g;
  s|href="#" onclick="closeMobileMenu\(\);return go\(\x27home\x27,event\)"|href="index-en.html"|g;
  s|href="#" onclick="closeA11y\(\);return go\(\x27home\x27,event\)"|href="index-en.html"|g;
  s|href="#" onclick="return go\(\x27home\x27,event\)"|href="index-en.html"|g;
  s|href="#" onclick="closeMobileMenu\(\);return go\(\x27([a-z][a-z0-9-]*)\x27,event\)"|href="$1-en.html"|g;
  s|href="#" onclick="closeA11y\(\);return go\(\x27([a-z][a-z0-9-]*)\x27,event\)"|href="$1-en.html"|g;
  s|href="#" onclick="return go\(\x27([a-z][a-z0-9-]*)\x27,event\)"|href="$1-en.html"|g;
' index-en.html.new
mv index-en.html.new index-en.html
echo "  EN  index-en.html (trimmed to home)"

echo ""
echo "Done. Pages:"
ls -1 *.html | sort