import React, { Fragment, useState } from 'react';
import { DataFooter } from './dataFooter';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import Separate from '~/components/separate';
import Image from '~/components/image';

const Footer = () => {
    const { t } = useTranslation();

    const [activeSection, setActiveSection] = useState<string | null>(null);

    const toggleSection = (section: string) => {
        setActiveSection((prev) => (prev === section ? null : section));
    };

    return (
        <footer className="relative pt-4 pl-2">
            <Separate className="absolute top-0 left-2 right-2 border-t" />
            <div className="relative mb-5 pr-2">
                <a
                    target="_blank"
                    href="https://effecthouse.tiktok.com/download?utm_campaign=ttweb_entrance_v1&utm_source=tiktok_webapp_main"
                >
                    <Image
                        className="rounded-lg"
                        src="https://sf16-website-login.neutral.ttwstatic.com/obj/tiktok_web_login_static/tiktok/webapp/main/webapp-desktop-islands/8152caf0c8e8bc67ae0d.png"
                        alt="Ticket"
                    />
                    <h4 className="absolute top-1/2 -translate-y-1/2 left-14 right-5 text-[13px] font-bold text-[rgb(255,245,201)] leading-4">
                        {t('layouts.footer.Effect House')}
                    </h4>
                </a>
            </div>

            {DataFooter.map(({ id, label, content }) => (
                <Fragment key={id}>
                    <h4
                        className={classNames('mt-1.5 text-sm font-bold cursor-pointer', {
                            'opacity-40': activeSection !== id,
                            'opacity-100': activeSection === id,
                        })}
                        onClick={() => toggleSection(id)}
                    >
                        {t(`layouts.footer.${label}`)}
                    </h4>

                    {activeSection === id && (
                        <div className="mb-2 text-xs font-semibold opacity-60">
                            {content.map(({ text, href }, index) => (
                                <a
                                    key={index}
                                    className="inline-block mt-1 mr-1.5 hover:underline"
                                    href={href}
                                    target="_blank"
                                >
                                    {t(`layouts.footer.${text}`)}
                                </a>
                            ))}
                        </div>
                    )}
                </Fragment>
            ))}

            <span className="mt-1 text-xs font-semibold opacity-50">© 2024 TikTok</span>
        </footer>
    );
};

export default Footer;
