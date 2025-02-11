import StockChart from '../components/StockChart';

export default function Home() {
    const stockData = [
        377, 177, 267, 259, 318, 207, 385, 194, 372, 355,
        482, 164, 144, 102, 446, 210, 251, 395, 423, 270,
        212, 319, 138, 431, 117, 389, 373, 186, 280, 468,
        134, 404, 270, 122, 210, 274, 277, 499, 434, 284,
        452, 396, 196, 342, 467, 173, 106, 315, 163, 469,
        259, 273, 174, 216, 295, 109, 116, 383, 222, 247,
        203, 396, 304, 333, 259, 361, 377, 370, 182, 424,
        277, 492, 360, 324, 391, 219, 277, 115, 305, 315,
        410, 209, 385, 234, 172, 344, 114, 355, 113, 152,
        328, 420, 254, 351, 412, 348, 154, 351, 286, 287
    ];

    const today = new Date();
    const labels = Array.from({ length: 100 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - (99 - i));
        return date.toLocaleDateString();
    });

    return (
        <div>
            <StockChart data={stockData} labels={labels} />
        </div>
    );
}