import React, { ReactNode, useState } from 'react';

interface TabProps {
  id: string;
  title: ReactNode;
  children: ReactNode;
  className?: string;
}

const Tab: React.FC<TabProps> = ({ id, children, className }) => {
  return (
    <div id={id} className={className}>
      {children}
    </div>
  );
};

interface TabsProps {
  onChange?: (activeTabId: string) => void;
  active: string;
  children: ReactNode;
  orientation?: 'horizontal' | 'vertical';
  tabClassName?: string;
  tabContentClassName?: string;
  containerClassName?: string;
}

const Tabs: React.FC<TabsProps> = ({
  onChange,
  active,
  children,
  orientation = 'horizontal',
  tabClassName = '',
  tabContentClassName = '',
  containerClassName = '',
}) => {
  const [activeTab, setActiveTab] = useState<string>(active);

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    if (onChange) onChange(id);
  };

  const tabContainerClasses = `flex ${orientation === 'horizontal' ? 'flex-row' : 'flex-col'} border-b border-gray-300 ${containerClassName}`;
  const tabClasses = `py-2 px-4 -mb-px text-sm font-medium ${tabClassName}`;
  const activeTabClasses = 'border-b-2 border-primary-500 text-primary-500';
  const inactiveTabClasses = 'text-gray-600 hover:text-primary-500';

  return (
    <div className={`w-full mx-auto ${containerClassName}`}>
      <div className={tabContainerClasses}>
        {React.Children.map(children, (child) =>
          React.isValidElement(child) && child.props.title ? (
            <button
              onClick={() => handleTabChange(child.props.id)}
              className={`${tabClasses} ${activeTab === child.props.id ? activeTabClasses : inactiveTabClasses}`}
            >
              {child.props.title}
            </button>
          ) : null
        )}
      </div>

      <div className="mt-4">
        {React.Children.map(children, (child) =>
          React.isValidElement(child) && child.props.id === activeTab ? (
            <div
              className={`${tabContentClassName} transition-all duration-300 ease-in-out`}
              key={child.props.id}
            >
              {child.props.children}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export { Tabs, Tab };
