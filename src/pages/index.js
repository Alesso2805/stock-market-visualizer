import StockChart from '../components/StockChart';

export default function Home() {
    const stockData = [
        377, 277, 267, 259, 318, 287, 345, 270, 292, 330,
        382, 364, 344, 302, 246, 260, 251, 290, 323, 270,
        212, 230, 240, 300, 217, 289, 273, 286, 250, 300,
        334, 284, 270, 222, 180, 174, 147, 190, 234, 284,
        300, 356, 296, 342, 207, 253, 293, 341, 364, 325,
        280, 273, 290, 300, 250, 270, 220, 180, 170, 150,
        190, 150, 180, 170, 130, 140, 190, 200, 205, 210,
        203, 247, 289, 319, 348, 393, 432, 369, 349, 338,
        368, 379, 348, 321, 370, 390, 367, 329, 298, 278,
        270, 259, 235, 199, 172, 224, 260, 284, 320, 279,
        311, 346, 299, 321, 356, 320, 187, 220, 274, 287
    ];

    const today = new Date();
    const labels = Array.from({ length: 110 }, (_, i) => {
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