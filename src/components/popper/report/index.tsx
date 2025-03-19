import { IrrelevantIcon, ReportIcon } from '~/assets/images/svgs';
import PopperWrapper from '..';
import ContentPopperWrapper from '../contentWrapper';

import './index.less';

import { useTranslation } from 'react-i18next';
import MenuItem from '../menu/menuItem';

const reportData = [
    {
        icon: <ReportIcon />,
        title: 'Report',
    },
    {
        icon: <IrrelevantIcon />,
        title: 'Mark as irrelevant',
        separate: true,
    },
];
const Report = ({ children }: Type) => {
    const { t } = useTranslation();
    return (
        <PopperWrapper
            onCreate={(instance) => {
                // Lấy phần tử popper chính là thẻ chứa ngoài dùng
                const popperElement = instance.popper;
                // Thêm class cho phần tử ngoài cùng
                popperElement.classList.add('!fixed');
            }}
            // visible
            placement="top-end"
            // placement="right"
            offset={[10, -3]}
            renderContent={
                <ContentPopperWrapper className="min-w-40 px-3 cursor-pointer">
                    {reportData.map((item, index) => (
                        <MenuItem
                            key={index}
                            className="py-3 hover:text-primary"
                            title={t(`components.popper.menu.report.${item.title}`)}
                            icon={item.icon}
                            onClick={(e) => e.stopPropagation()}
                            separate={item.separate}
                        />
                    ))}
                </ContentPopperWrapper>
            }
        >
            {children}
        </PopperWrapper>
    );
};

type Type = {
    children: React.ReactElement;
};

export default Report;
