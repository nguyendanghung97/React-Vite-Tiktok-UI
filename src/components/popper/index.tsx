import HeadlessTippy, { TippyProps } from '@tippyjs/react/headless';

import './index.less';
import { FillArrowDownIcon } from '~/assets/images/svgs';
import classNames from 'classnames';

const PopperWrapper = ({ children, renderContent, positionArrow, ...passProps }: PopperProps) => {
    return (
        <HeadlessTippy
            interactive
            delay={[0, 500]}
            placement="bottom"
            render={(attrs) => (
                <div
                    tabIndex={-1}
                    {...attrs}
                    className="shadow-[0px_4px_16px_rgba(0,0,0,0.12)] bg-light-bgPopper dark:bg-dark-bgPopper rounded-lg overflow-hidden"
                >
                    {positionArrow && (
                        <div
                            data-popper-arrow
                            className={classNames('text-light-bgPopper dark:text-dark-bgPopper', {
                                '-top-2': positionArrow === 'top',
                                'top-full': positionArrow !== 'top',
                            })}
                        >
                            <FillArrowDownIcon
                                className={classNames({
                                    'rotate-180': positionArrow !== 'top',
                                })}
                            />
                        </div>
                    )}
                    {/* {renderArrow} */}
                    {renderContent}
                </div>
            )}
            {...passProps}
        >
            {children}
        </HeadlessTippy>
    );
};

type PopperProps = TippyProps & {
    children: React.ReactElement;
    renderContent: React.ReactNode;
    renderArrow?: React.ReactNode;
    positionArrow?: 'top' | 'bottom';
};

export default PopperWrapper;
