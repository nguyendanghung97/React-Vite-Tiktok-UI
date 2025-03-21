import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

import { publicRoutes } from './routes';
import DefaultLayout from './layouts';
import { Suspense } from 'react';

function App() {
    return (
        <Router>
            <div className="App">
                {/* text-textLight bg-bgLight dark:text-textDark dark:text-opacity-90 dark:bg-bgDark */}
                {/* Khi sử dụng React.lazy(), component được tải bất đồng bộ. Nếu không bọc trong <Suspense>, React sẽ không biết phải hiển thị gì trong khi chờ tải file. */}
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;

                            // React.ElementType: Đây là một kiểu tổng quát cho các thành phần React. Nó có thể là một thành phần chức năng (FC), class component, hoặc một phần tử như Fragment.
                            let Layout: React.ElementType = DefaultLayout;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </Suspense>
            </div>
        </Router>
    );
}

export default App;
