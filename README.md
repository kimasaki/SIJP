# SIJP static site

sijp.org (WordPress / Inspiro テーマ) から必要なページだけを抜き出し、[Astro](https://astro.build/) で静的サイトにしたものです。出力は普通の HTML/CSS/画像だけで、サーバー側のプログラムはありません。

## リポジトリ

https://github.com/kimasaki/SIJP （ブランチ `main`）

## コマンド

Node.js 22.23.4 以上が必要です（Astro 7 の要件。`package.json` の `engines` にも記載）。

```
npm install       # 初回のみ
npm run dev       # http://localhost:4321/ で確認（編集が即反映）
npm run build     # dist/ に公開用ファイルを生成
npm run preview   # dist/ を確認
```

## ページ構成（URL は WordPress 時代と同じ）

| URL | ファイル |
|---|---|
| `/` | `src/pages/index.astro` |
| `/about-us/` | `src/pages/about-us.astro` |
| `/staff/` | `src/pages/staff.astro` |
| `/student-division/` | `src/pages/student-division.astro` |
| `/contact-us/` | `src/pages/contact-us.astro` |
| `/privacy-policy/` | `src/pages/privacy-policy.astro` |
| `/sijp-volunteer-guidelines_en/` | `src/pages/sijp-volunteer-guidelines_en.astro` |
| `/sijp-volunteer-guidelines-jp/` | `src/pages/sijp-volunteer-guidelines-jp.astro` |

新しいページは `src/pages/` に `.astro` を追加するだけです（`PageLayout` を使えば見出し・余白・ヘッダー・フッターが付きます）。

## ディレクトリ

- `src/layouts/` — `BaseLayout`（head / ヘッダー / フッター）、`PageLayout`（内部ページ用）
- `src/components/` — `Header` `Footer` `ToTop` `Button` `ActivityCard` `JoinRow`
- `src/data/site.ts` — サイト名、フッターのリンク、Facebook URL、トップの Activities / Join の文言とアイコン名
- `src/data/icons.ts` — トップの Activities のアイコン（[Google Material Symbols](https://fonts.google.com/icons) の SVG パス。差し替えるときは、アイコンの SVG の `d` 属性をここに追加し、`site.ts` でその名前を指定）
- `src/styles/` — CSS（`base` `layout` `home` `page` `responsive`）
- `src/scripts/main.ts` — ヘッダーの色替えと「トップへ戻る」ボタン
- `src/assets/images/` — Message 背景の写真（`message-bg.jpg`。差し替えるときは同じファイル名で上書き）
- `public/` — そのまま公開されるファイル（`video/seattle_lp.mp4`、`favicon.png` など、`robots.txt`）

## 公開環境

- 公開先: Cloudflare Workers & Pages（Workers & Pages → プロジェクト → Settings → Domains & Routes で `sijp.org` を Custom domain に設定）
- ドメイン: レジストラは eNom、ネームサーバーは Cloudflare。DNS レコードは Cloudflare のダッシュボードで管理します
- 旧 WordPress サイトは削除済みです（旧サーバーを指していた A レコードも削除済み）
- MX や TXT（メール関係）のレコードを追加するときも Cloudflare 側で行います

## デプロイ

### 手動

```
npm run build
npx wrangler deploy        # dist/ を Worker sijp-static に公開（設定は wrangler.jsonc）
```

ダッシュボードの Upload assets から `dist/` をアップロードしてもかまいません。

### 自動デプロイ（CI/CD）

`main` に push すると Cloudflare 側でビルドして公開されます。設定は次のとおりです。


1. GitHub リポジトリ [kimasaki/SIJP](https://github.com/kimasaki/SIJP) の `main` に push する（`.gitignore` で `node_modules/` `dist/` `.astro/` は除外済み）
2. Worker `sijp-static` の Settings → Build で GitHub リポジトリを接続し、次を設定する
   - Build command: `npm run build`
   - Deploy command（Workers の場合）: `npx wrangler deploy`
   - 環境変数 `NODE_VERSION`: `22.23.4` 以上（例: `24`）。Cloudflare の既定の Node が古いと Astro 7 のビルドが失敗します
3. GitHub Actions でデプロイする場合は `cloudflare/wrangler-action` を使い、リポジトリの Secrets に `CLOUDFLARE_API_TOKEN` と `CLOUDFLARE_ACCOUNT_ID` を登録する

`wrangler deploy` の設定はリポジトリ直下の `wrangler.jsonc` にあります。`name`（`sijp-static`）はダッシュボードの Worker 名と同じにしてください。違う名前だと別の Worker が新しく作られます。

## WordPress から外したもの

- 投稿、カテゴリー一覧、Latest News、検索ボックス
- About / スタッフページのスライダー（MetaSlider）
- 寄付ページ（`/donations/`）とトップの「How to join」の Donations（2026年10月に不要と判断し削除）
- ヘッダーのメニュー（ページ間の移動はトップのボタンとフッターのリンクで行います）
- EVENT メニュー、サイトマップ、学生部の部署ページ、Student Essays、Event YouTube
