/**
 * 创建命名空间，包含组件名和公共class
 * @param prefix 公共前缀
 * @returns
 */
export function createNameSpaceFn(prefix: string) {
    return (name: string) => {
        const componentName = `${prefix}-${name}`

        const createBEM = (suffix?: string) => {
            if (!suffix) return componentName
            return suffix.startsWith('--') ? `${componentName}${suffix}` : `${componentName}__${suffix}`
        }

        return {
            name: componentName,
            n: createBEM,
        }
    }
}

export const createNameSpace = createNameSpaceFn('cb')