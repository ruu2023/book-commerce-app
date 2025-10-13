# Book Commerce App

<div align="center">
<img src="https://pub-fe9124e9c12542c486765d4b468909a4.r2.dev/2025-10/2025-10-13_12-52-46.webp" width=200/>
</div>

<br>

個人が執筆した記事や電子書籍を販売できる、オンライン記事販売プラットフォームです。
Next.js(App Router), TypeScript, microCMS, Stripe Checkoutといったモダンな技術スタックで構築されています。

**[X(ruu2023)](https://x.com/ruu_web)**

<br>

## 🚀 デモサイト

実際にアプリケーションを触ってみたい方は、以下のURLからアクセスしてください。

**URL:** **[https://book-commerce-app-six-red.vercel.app/](https://book-commerce-app-six-red.vercel.app/)**

<br>

## ✨ 主な機能

  * **ユーザー認証機能 (GitHub OAuth)**

      * NextAuth.jsを利用し、GitHubアカウントで簡単に会員登録・ログインができます。

  * **記事の一覧・詳細表示**

      * ヘッドレスCMSであるmicroCMSで管理している記事情報を取得し、一覧・詳細ページに表示します。

  * **決済機能 (Stripe Checkout)**

      * Stripeと連携し、クレジットカードによる記事の購入が可能です。
      * 購入ボタンをクリックすると、Stripeが提供する安全な決済ページに遷移します。

  * **購入履歴の確認**

      * ログインしているユーザーは、自身が購入した記事の一覧をマイページで確認できます。

  * **WebhookによるDB同期**

      * StripeのWebhookを利用し、決済が完了した際に自動でデータベースに購入情報を記録します。

<br>

## 🛠️ 使用技術
<p>
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma">
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/NextAuth.js-000?style=for-the-badge&logo=nextauth.js&logoColor=white" alt="NextAuth.js">
  <img src="https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe">
  <img src="https://img.shields.io/badge/microCMS-333333?style=for-the-badge&logo=microcms&logoColor=00C7B7" alt="microCMS">
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
</p>

| カテゴリ | 技術 | 役割 |
| :--- | :--- | :--- |
| **フロントエンド** | Next.js (App Router), React, TypeScript | UIの構築、静的サイト生成(SSG) |
| **スタイリング** | Tailwind CSS | ユーティリティファーストなCSS設計 |
| **バックエンド** | Next.js (Route Handlers) | APIエンドポイントの作成 (Stripe連携など) |
| **データベース** | PostgreSQL (Supabase等) | ユーザー情報、購入情報の永続化 |
| **ORM** | Prisma | 型安全なデータベースアクセス |
| **認証** | NextAuth.js | GitHubアカウントを利用したOAuth認証 |
| **CMS** | microCMS | 記事コンテンツの管理 (ヘッドレスCMS) |
| **決済** | Stripe | クレジットカード決済処理 (Stripe Checkout) |
| **デプロイ** | Vercel | ホスティング、CI/CD |

<br>

## 🔧 環境構築

このアプリケーションをローカル環境で動かすための手順です。

1.  **リポジトリをクローン**

    ```bash
    git clone https://github.com/ruu2023/book-commerce-app.git
    cd book-commerce-app
    ```

2.  **依存関係をインストール**

    ```bash
    # pnpmを推奨します
    pnpm install
    ```

3.  **環境変数を設定**
    ルートディレクトリに `.env.local` ファイルを作成し、以下の内容を参考に必要な情報を設定してください。

    ```.env.local
    # Prisma / Database
    DATABASE_URL="YOUR_POSTGRESQL_DATABASE_URL"

    # NextAuth.js (GitHub OAuth)
    GITHUB_ID="YOUR_GITHUB_OAUTH_APP_ID"
    GITHUB_SECRET="YOUR_GITHUB_OAUTH_APP_SECRET"
    NEXTAUTH_URL="http://localhost:3000"
    NEXTAUTH_SECRET="YOUR_RANDOM_SECRET_STRING"

    # Stripe
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY="YOUR_STRIPE_PUBLIC_KEY"
    STRIPE_SECRET_KEY="YOUR_STRIPE_SECRET_KEY"
    STRIPE_WEBHOOK_SECRET_KEY="YOUR_STRIPE_WEBHOOK_SECRET"

    # microCMS
    MICROCMS_API_KEY="YOUR_MICROCMS_API_KEY"
    MICROCMS_SERVICE_DOMAIN="YOUR_MICROCMS_SERVICE_DOMAIN"
    ```

4.  **データベースのマイグレーション**
    Prismaを使って、データベースにテーブルを作成します。

    ```bash
    pnpm prisma migrate dev
    ```

5.  **開発サーバーを起動**

    ```bash
    pnpm dev
    ```

    ブラウザで `http://localhost:3000` にアクセスすると、アプリケーションが表示されます。

<br>

## 📝 今後の課題・改善点

  * ユーザーがお気に入りの記事を登録できる「いいね」機能の実装
  * タグによる記事の絞り込み機能
  * 購入後のレビュー投稿機能

<br>

## ©️ ライセンス

[MIT License](https://www.google.com/search?q=LICENSE)
