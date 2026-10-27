#!/usr/bin/env bash
# Restructure footer into a real sitemap with columns. Updates CSS + HTML in all 42 files.
set -e
cd "$(dirname "$0")"

# ===== CSS update (universal — same for HE and EN files) =====
NEW_CSS='footer{background:var(--g1);padding:48px 48px 28px;display:flex;flex-direction:column;gap:28px}
.foot-top{display:grid;grid-template-columns:1.6fr repeat(4,1fr);gap:36px;align-items:start}
.foot-brand{color:rgba(255,255,255,.9)}
.foot-logo{font-size:1.4rem;font-weight:900;color:rgba(255,255,255,.95);margin-bottom:10px}
.foot-tagline{color:rgba(255,255,255,.55);font-size:.8rem;line-height:1.7;max-width:320px}
.foot-col h4{color:rgba(255,255,255,.9);font-size:.82rem;font-weight:800;margin-bottom:14px;letter-spacing:.5px;text-transform:uppercase}
.foot-col a{display:block;color:rgba(255,255,255,.55);text-decoration:none;font-size:.81rem;padding:5px 0;transition:.18s}
.foot-col a:hover{color:#fff;padding-inline-start:4px}
.foot-copy{color:rgba(255,255,255,.5);font-size:.76rem;text-align:center;border-top:1px solid rgba(255,255,255,.12);padding-top:20px;margin-top:4px}
.foot-copy a{color:rgba(255,255,255,.6);text-decoration:none}
.foot-copy a:hover{color:#fff}'

NEW_CSS_1024='  footer{padding:40px 32px 24px}
  .foot-top{grid-template-columns:1fr 1fr 1fr;gap:28px}
  .foot-brand{grid-column:1/-1}'

NEW_CSS_820='  footer{padding:32px 22px 20px}
  .foot-top{grid-template-columns:1fr 1fr;gap:24px}
  .foot-brand{grid-column:1/-1;text-align:center}
  .foot-tagline{margin:0 auto}'

export NEW_CSS NEW_CSS_1024 NEW_CSS_820

for f in *.html; do
  [ "$f" = "build-pages.sh" ] && continue
  perl -i -CSDA -Mutf8 -0777 -pe '
    my $css = $ENV{NEW_CSS};
    my $css1024 = $ENV{NEW_CSS_1024};
    my $css820 = $ENV{NEW_CSS_820};
    s|footer\{background:var\(--g1\);padding:40px 48px;display:flex;flex-direction:column;gap:16px\}\n\.foot-top\{[^}]+\}\n\.foot-logo\{[^}]+\}\n\.foot-links\{[^}]+\}\n\.foot-links a\{[^}]+\}\n\.foot-links a:hover\{[^}]+\}\n\.foot-copy\{[^}]+\}|$css|s;
    s|  footer\{padding:36px 32px\}\n  \.foot-top\{gap:24px\}|$css1024|s;
    s|  footer\{flex-direction:column;text-align:center;padding:28px 20px\}\n  \.foot-top\{flex-direction:column;align-items:center;gap:14px\}\n  \.foot-links\{justify-content:center\}|$css820|s;
  ' "$f"
done
echo "CSS updated in all files."

# ===== HE footer HTML =====
NEW_FOOTER_HE='<footer>
  <div class="foot-top">
    <div class="foot-brand">
      <div class="foot-logo">AgroSoft</div>
      <div class="foot-tagline">בית תוכנה המתמחה בפתרונות מבוססי Priority ERP לחברות מענף החקלאות.</div>
    </div>
    <div class="foot-col">
      <h4>חברה</h4>
      <a href="about.html">אודות</a>
      <a href="customers.html">הלקוחות שלנו</a>
      <a href="contact.html">יצירת קשר</a>
    </div>
    <div class="foot-col">
      <h4>פתרונות</h4>
      <a href="agropriority.html">AgroPriority</a>
      <a href="agrotalk.html">AgroTalk</a>
      <a href="agrosmart.html">AgroSmart</a>
      <a href="agroqc.html">AgroQC</a>
      <a href="agroshop.html">AgroShop</a>
    </div>
    <div class="foot-col">
      <h4>חדשות ומידע</h4>
      <a href="news.html">חדשות ועדכונים</a>
      <a href="accessibility.html">הצהרת נגישות</a>
      <a href="privacy.html">מדיניות פרטיות</a>
    </div>
    <div class="foot-col">
      <h4>שירותים</h4>
      <a href="https://www.agropriority.com/ServiceCalls" target="_blank">שירות לקוחות</a>
      <a href="https://www.farm-online.net/login_new/" target="_blank">פורטל מגדלים</a>
      <a href="index-en.html">English</a>
    </div>
  </div>
  <div class="foot-copy">© 2009–2026 כל הזכויות שמורות | עיצוב ובנייה ע"י <a href="https://ombee.co.il" target="_blank">OMBee Graphic Design And UI/UX</a></div>
</footer>'

# ===== EN footer HTML =====
NEW_FOOTER_EN='<footer>
  <div class="foot-top">
    <div class="foot-brand">
      <div class="foot-logo">AgroSoft</div>
      <div class="foot-tagline">A software house specializing in Priority ERP-based solutions for agricultural companies.</div>
    </div>
    <div class="foot-col">
      <h4>Company</h4>
      <a href="about-en.html">About</a>
      <a href="customers-en.html">Our Clients</a>
      <a href="contact-en.html">Contact</a>
    </div>
    <div class="foot-col">
      <h4>Solutions</h4>
      <a href="agropriority-en.html">AgroPriority</a>
      <a href="agrotalk-en.html">AgroTalk</a>
      <a href="agrosmart-en.html">AgroSmart</a>
      <a href="agroqc-en.html">AgroQC</a>
      <a href="agroshop-en.html">AgroShop</a>
    </div>
    <div class="foot-col">
      <h4>News &amp; Info</h4>
      <a href="news-en.html">News &amp; Updates</a>
      <a href="accessibility-en.html">Accessibility</a>
      <a href="privacy-en.html">Privacy Policy</a>
    </div>
    <div class="foot-col">
      <h4>Services</h4>
      <a href="https://www.agropriority.com/ServiceCalls" target="_blank">Customer Service</a>
      <a href="https://www.farm-online.net/login_new/" target="_blank">Growers Portal</a>
      <a href="index.html">עברית</a>
    </div>
  </div>
  <div class="foot-copy">&copy; 2009&ndash;2026 All rights reserved | Design &amp; Development by <a href="https://ombee.co.il" target="_blank">OMBee Graphic Design And UI/UX</a></div>
</footer>'

export NEW_FOOTER_HE NEW_FOOTER_EN

# Apply to HE files (any *.html that is NOT *-en.html)
for f in *.html; do
  case "$f" in
    *-en.html) continue ;;
  esac
  perl -i -CSDA -Mutf8 -0777 -pe '
    my $new = $ENV{NEW_FOOTER_HE};
    s|<footer>.*?</footer>|$new|s;
  ' "$f"
done
echo "HE footer HTML updated."

for f in *-en.html; do
  perl -i -CSDA -Mutf8 -0777 -pe '
    my $new = $ENV{NEW_FOOTER_EN};
    s|<footer>.*?</footer>|$new|s;
  ' "$f"
done
echo "EN footer HTML updated."
echo "Done."