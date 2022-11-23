export const pagesPath = {
  "games": {
    "hiddenPicture": {
      $url: (url?: { hash?: string }) => ({ pathname: '/games/hiddenPicture' as const, hash: url?.hash })
    },
    "scriptMemorize": {
      $url: (url?: { hash?: string }) => ({ pathname: '/games/scriptMemorize' as const, hash: url?.hash })
    }
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath

export const staticPath = {
  favicon_ico: '/favicon.ico',
  vercel_svg: '/vercel.svg'
} as const

export type StaticPath = typeof staticPath