import { Search } from "lucide-react";

export default function SearchBar() {
    return (
        <div className="flex items-center gap-2 border border-border rounded-md px-3 py-2 bg-background h-11">
            <Search className="text-grey-2" size={16} />
            <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none text-sm text-grey-3 placeholder:text-grey-3 w-70"
            />
        </div>
    );
}