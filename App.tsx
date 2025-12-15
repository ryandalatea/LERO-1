import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { PageOne } from './pages/PageOne';
import { PageTwo } from './pages/PageTwo';
import { PageThree } from './pages/PageThree';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    const goToNext = () => {
        if (currentPage < 3) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const renderPage = () => {
        switch (currentPage) {
            case 1:
                return <PageOne onNext={goToNext} />;
            case 2:
                return <PageTwo onNext={goToNext} />;
            case 3:
                return <PageThree />;
            default:
                return <PageOne onNext={goToNext} />;
        }
    };

    return (
        <Layout currentPage={currentPage}>
            <div className="animate-fadeIn w-full">
                {renderPage()}
            </div>
        </Layout>
    );
};

export default App;