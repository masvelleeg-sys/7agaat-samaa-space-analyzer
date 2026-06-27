# محلل المكان الذكي – حاجات سما 🏠📷🤖

> ويدجت ذكي يفتح الكاميرا، يحلل المساحة بـ **Gemini AI** الحقيقي، ويقترح أثاث من **حاجات سما** مناسب للغرفة.

---

## 🚀 رفع على GitHub Pages

### الخطوات:
1. ارفع محتوى مجلد `space-analyzer-widget/` على GitHub repository جديد
2. اذهب لـ **Settings → Pages → Source → main branch / root**
3. الموقع هيكون متاح على:
   ```
   https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
   ```

> ✅ GitHub Pages يدعم HTTPS تلقائياً – الكاميرا والـ AI ستعمل بدون أي إعداد إضافي

---

## 🔗 إضافة الويدجت لأي موقع (سطر واحد فقط!)

بعد ما ترفع على GitHub Pages، أضف هذا السطر في أي موقع قبل `</body>`:

```html
<!-- محلل المكان الذكي – حاجات سما -->
<script src="https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/widget.js"></script>
```

### مثال كامل:
```html
<!DOCTYPE html>
<html>
<head>
  <title>موقع حاجات سما</title>
</head>
<body>

  <!-- محتوى موقعك هنا -->

  <!-- ← أضف هذا السطر فقط -->
  <script src="https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/widget.js"></script>

</body>
</html>
```

> الويدجت هيظهر تلقائياً كأيكونة عائمة في أسفل يسار الصفحة – تماماً زي زرار WhatsApp! 💬

---

## 📁 هيكل الملفات

```
space-analyzer-widget/
├── index.html     ← الصفحة الكاملة (للعرض على GitHub Pages)
├── widget.js      ← السكريبت للتضمين في أي موقع (سطر واحد!)
├── _headers       ← إعدادات Headers لـ Netlify / Cloudflare Pages
└── README.md      ← هذا الملف
```

---

## 🤖 كيف يعمل الـ AI

الويدجت يستخدم **Google Gemini 1.5 Flash Vision** لتحليل الصورة:

| ما يحلله | التفاصيل |
|----------|----------|
| 📐 الأبعاد | تقدير تقريبي للعرض × الطول × الارتفاع بالمتر |
| 🎨 الستايل | مودرن / كلاسيك / مينيمال / بوهيمي ... |
| 🛋️ الأثاث الموجود | قائمة بما في الصورة فعلاً |
| ➕ الأثاث المقترح | ما ينقص الغرفة |
| 🛍️ المنتجات | توصيات مخصصة من كتالوج حاجات سما |

---

## 📱 الأنظمة المدعومة

| المتصفح / النظام | الدعم |
|-----------------|-------|
| iOS Safari 11+ (iPhone/iPad) | ✅ كامل |
| Android Chrome 53+ | ✅ كامل |
| Samsung Browser 4+ | ✅ كامل |
| Firefox (Android/Desktop) | ✅ كامل |
| Chrome Desktop | ✅ كامل |
| Edge / Opera | ✅ كامل |
| UC Browser | ✅ مع fallback |
| WeChat In-App Browser | ⚠️ يطلب فتح في Chrome/Safari |

---

## ⚠️ متطلبات مهمة

### HTTPS إلزامي للكاميرا
```
✅ https://username.github.io    ← يعمل (GitHub Pages)
✅ http://localhost               ← يعمل (تطوير)
❌ http://mysite.com             ← لا تعمل الكاميرا
```

### إضافة لموقع Wuilt أو أي موقع خارجي
1. تأكد أن موقعك على **HTTPS**
2. أضف السكريبت قبل `</body>`
3. الكاميرا ستطلب إذن من المستخدم في أول مرة – اضغط **السماح**

---

## 🔧 تعديل المفتاح (اختياري)

المفتاح مدمج مباشرةً في الكود. لو أردت تغييره:

في `index.html`:
```javascript
var HARDCODED_KEY = 'مفتاحك_الجديد_هنا';
```

في `widget.js` (آخر سطر):
```javascript
})('مفتاحك_الجديد_هنا');
```

---

© 2025 حاجات سما – جميع الحقوق محفوظة  
[🛍️ تصفح المنتجات](https://7agatsamaa.wuiltstore.com)
