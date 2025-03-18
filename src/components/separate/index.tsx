import classNames from 'classnames';

const Separate = ({ className }: Type) => {
    return <div className={classNames('!border-opacity-15 border-light-text dark:border-dark-text', className)}></div>;
};

type Type = {
    className?: string;
};

export default Separate;
