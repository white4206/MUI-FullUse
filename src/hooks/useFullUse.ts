import { use } from 'react';
import { FullUseContext } from '@/context/FullUseContext';

// 全局参数
const useFullUse = () => use(FullUseContext);

export default useFullUse;
