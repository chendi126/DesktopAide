import { contextBridge, ipcRenderer } from 'electron'

// 暴露安全的API到渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  // 应用追踪相关API
  getAppUsageData: (date?: string) => ipcRenderer.invoke('get-app-usage-data', date),
  getCurrentApp: () => ipcRenderer.invoke('get-current-app'),
  getTodayStats: () => ipcRenderer.invoke('get-today-stats'),
  getCurrentAppStartTime: () => ipcRenderer.invoke('get-current-app-start-time'),
  getDataDirectory: () => ipcRenderer.invoke('get-data-directory'),
  getTodayDataFilePath: () => ipcRenderer.invoke('get-today-data-file-path'),
  
  // 工作模式相关API
  getAllWorkModes: () => ipcRenderer.invoke('get-all-work-modes'),
  getWorkMode: (id: string) => ipcRenderer.invoke('get-work-mode', id),
  createWorkMode: (name: string, description?: string) => ipcRenderer.invoke('create-work-mode', name, description),
  updateWorkMode: (id: string, updates: any) => ipcRenderer.invoke('update-work-mode', id, updates),
  deleteWorkMode: (id: string) => ipcRenderer.invoke('delete-work-mode', id),
  startWorkMode: (id: string) => ipcRenderer.invoke('start-work-mode', id),
  stopWorkMode: (id: string) => ipcRenderer.invoke('stop-work-mode', id),
  getRunningModeId: () => ipcRenderer.invoke('get-running-mode-id'),
  
  // 自启动应用相关API
  selectExecutableFile: () => ipcRenderer.invoke('select-executable-file'),
  addAutoStartApp: (modeId: string, app: any) => ipcRenderer.invoke('add-auto-start-app', modeId, app),
  updateAutoStartApp: (modeId: string, appId: string, updates: any) => ipcRenderer.invoke('update-auto-start-app', modeId, appId, updates),
  removeAutoStartApp: (modeId: string, appId: string) => ipcRenderer.invoke('remove-auto-start-app', modeId, appId),
  
  // 黑名单应用相关API
  addBlacklistApp: (modeId: string, app: any) => ipcRenderer.invoke('add-blacklist-app', modeId, app),
  updateBlacklistApp: (modeId: string, appId: string, updates: any) => ipcRenderer.invoke('update-blacklist-app', modeId, appId, updates),
  removeBlacklistApp: (modeId: string, appId: string) => ipcRenderer.invoke('remove-blacklist-app', modeId, appId),
  getRunningProcesses: () => ipcRenderer.invoke('get-running-processes'),
  
  // 监听应用使用更新
  onAppUsageUpdated: (callback: (data: any) => void) => {
    ipcRenderer.on('app-usage-updated', (event, data) => callback(data))
  },
  
  // 监听增量更新
  onAppUsageIncrementalUpdate: (callback: (data: any) => void) => {
    ipcRenderer.on('app-usage-incremental-update', (event, data) => callback(data))
  },
  
  // 移除监听器
  removeAppUsageListener: () => {
    ipcRenderer.removeAllListeners('app-usage-updated')
    ipcRenderer.removeAllListeners('app-usage-incremental-update')
  },
  
  // 工作模式状态管理API
  setWorkModeActive: (isActive: boolean) => ipcRenderer.invoke('set-work-mode-active', isActive),
  getWorkModeActive: () => ipcRenderer.invoke('get-work-mode-active'),
  
  // Windows 资源管理器
  openWindowsExplorer: (path?: string) => ipcRenderer.invoke('open-windows-explorer', path),

  // 数据导出相关API
  setFeishuConfig: (config: any) => ipcRenderer.invoke('set-feishu-config', config),
  getExportConfig: () => ipcRenderer.invoke('get-export-config'),
  testFeishuConnection: () => ipcRenderer.invoke('test-feishu-connection'),
  exportTodayData: () => ipcRenderer.invoke('export-today-data'),
  exportDateData: (date: string) => ipcRenderer.invoke('export-date-data', date),

  enableAutoExport: (intervalHours: number) => ipcRenderer.invoke('enable-auto-export', intervalHours),
  disableAutoExport: () => ipcRenderer.invoke('disable-auto-export'),
  getExportStatus: () => ipcRenderer.invoke('get-export-status'),
  exportAppUsageSummary: (date?: string) => ipcRenderer.invoke('export-app-usage-summary', date),
  setAutoOpenTable: (enabled: boolean) => ipcRenderer.invoke('set-auto-open-table', enabled),

  // 用户表格管理
  createUserTable: (templateConfig: any) => ipcRenderer.invoke('create-user-table', templateConfig),
  isUsingSharedTable: () => ipcRenderer.invoke('is-using-shared-table'),
  getUserId: () => ipcRenderer.invoke('get-user-id'),

  // 调试功能
  debugTableStructure: () => ipcRenderer.invoke('debug-table-structure')
})

console.log('Preload script loaded')
