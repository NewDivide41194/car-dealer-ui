import { SortingOrder } from "../../types/common";

interface SortingSelectorProps {
    label: string;
}
const SortingSelector = (props: SortingSelectorProps) => {
    const { label } = props;
    const optionData = Object.keys(SortingOrder);
    return (
        <div className="flex flex-row items-center">
            <label
                htmlFor="sorting-selector"
                className="block text-sm text-gray-900 dark:text-white whitespace-nowrap mx-4 font-bold">
                {label} :
            </label>
            {optionData.map((v,k)=><div className="flex items-center mx-2" key={k}>
                <input id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{v.toLocaleLowerCase()}</label>
            </div>)}
            
        </div>
    )
}

export default SortingSelector;