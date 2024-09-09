# react-configurable-router

> 仿 vue-router 的 react 配置式路由，基于 react-router6

## 使用

### 添加路由组件

**使用 `export default` 默认导出路由组件**

```tsx
// home/index.tsx
export default function Home() {
  return <div>Home</div>
}
```

### 路由配置文件

```tsx
// routes.ts
import { type Route } from 'react-configurable-router'

const routes: Route[] = [
  {
    path: '/',
    lazyComponent: import('@/pages/home'),
    meta: {
      data: 'any',
    },
  },
  {
    path: '/user',
    children: [
      {
        path: 'login',
        lazyComponent: import('@/pages/user/login'),
      },
    ],
  },
  {
    path: '/redirect',
    redirect: '/user/login',
  },
  {
    path: '*',
    lazyComponent: import('@/pages/not-found'),
  }
]
```

### 配置 react-router-dom

```tsx
import { ConfigurableRouter } from 'react-configurable-router'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.getElementById('root'))

// **使用传统路由**
root.render(
  <BrowserRouter>
    <ConfigurableRouter routes={routes}></ConfigurableRouter>
  </BrowserRouter>,
)
```

### 获取 meta 数据

有以下方式获取 meta 数据

#### 1. 从 `props` 中获取 meta 元信息

```tsx
import { type PropsWithMeta } from 'react-configurable-router'

export default function (props: PropsWithMeta) {
  const { meta } = props
}
```

#### 2. 使用 `useMetas` 获取 meta 元信息

```tsx
import { useMetas } from 'react-configurable-router'

export function Component() {
  const { metas } = useMetas()
}
```

## API

```ts
// ConfigurableRouter

interface RouterProps {
  /**
   * 路由配置
   */
  routes: Route[]
  /**
   * 路由挂载之前执行，可用于拦截路由重定向
   */
  onRouteWillMount?: OnRouteWillMount
  /**
   * 路由挂载时执行
   */
  onRouteMount?: OnRouteMount
  /**
   * 路由卸载时执行
   */
  onRouteUnmount?: OnRouteUnmount
  /**
   * 增强渲染函数，用于自定义渲染逻辑
   * 可以跟动画库结合，实现路由切换动画
   */
  render?: (children: ReactNode | null) => ReactNode
  /**
   * 路由懒加载时的loading组件
   */
  suspense?: ReactNode
  /**
   * basename
   */
  basename?: string
}
```

## 更多

- [vite-plugin-remix-flat-routes](https://github.com/hemengke1997/vite-plugin-remix-flat-routes)：基于 remix-flat-routes 的 vite 插件，约定式路由
