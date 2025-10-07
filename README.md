# 丸の内インベストメントグループ - 会社概要

## プロジェクト概要
丸の内インベストメントグループの会社概要資料サイト（スライド形式）

## ファイル構成
- `index_slide.html` - メインサイト（PowerPointスタイル）
- `index.html` - 旧バージョン（スクロール形式）
- `images/hero.png` - ヒーロー背景画像
- `generate-pdf.js` - PDF自動生成スクリプト

## 開発

### ローカルサーバー起動
```bash
npm run dev
# または
python3 -m http.server 8000
```

ブラウザで http://localhost:8000/index_slide.html を開く

### PDF生成

#### 方法1：自動生成（Puppeteer）
```bash
# インストール
npm install

# PDF生成
npm run generate-pdf

# 個別スライドをPNG画像として生成
node generate-pdf.js --images
```

#### 方法2：ブラウザから手動
1. Chrome/Edgeでサイトを開く
2. Ctrl+P (Mac: Cmd+P)
3. 「PDFに保存」を選択
4. 「背景のグラフィック」にチェック
5. 保存

## デプロイ

### Vercel
```bash
# Vercel CLIインストール（初回のみ）
npm install -g vercel

# デプロイ
vercel

# 本番デプロイ
vercel --prod
```

### 他のホスティング
静的HTMLファイルなので、以下でもデプロイ可能：
- Netlify
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront

## 操作方法

### PC
- **マウスホイール**: 上下スクロールでスライド移動
- **矢印キー**: ↑↓でスライド移動
- **右側ドット**: クリックで任意のスライドへジャンプ

### モバイル
- 「PC版推奨」画面が表示される
- PDFダウンロードボタンからPDF版を取得可能

## スライド構成（全10ページ）
1. カバー（会社概要）
2. 会社概要（基本情報・オフィス所在地）
3. 当社の強み
4. 出資先実績
5. ロールアップ戦略
6. 投資対象（Buy-Box）
7. 取引条件
8. 取引プロセス
9. 投資チーム
10. お問い合わせ

## 技術スタック
- React 18（CDN版）
- Tailwind CSS（CDN版）
- Babel Standalone
- Puppeteer（PDF生成）

## ライセンス
Private - 丸の内インベストメントグループ株式会社
