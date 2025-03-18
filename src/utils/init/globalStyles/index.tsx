import { PropsWithChildren } from 'react';
import './index.less';

// PropsWithChildren: chỉ nhận children mà không yêu cầu thêm props.
const GlobalStyles = ({ children }: PropsWithChildren) => {
    return children;
};

export default GlobalStyles;
