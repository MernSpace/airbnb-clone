import { Search, MapPin, Calendar, Users, Navigation, Building, Zap, Landmark, Mountain, Trees, ChevronLeft, ChevronRight, Plus, Minus, Heart, Utensils, Waves, Sparkles, Camera, Sun, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { format, addDays, addMonths } from "date-fns";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";


const SearchBar = () => {
    const [activeField, setActiveField] = useState<string | null>(null);
    const [whereValue, setWhereValue] = useState("");
    const [isWhereOpen, setIsWhereOpen] = useState(false);
    const [isCheckinOpen, setIsCheckinOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [isWhoOpen, setIsWhoOpen] = useState(false);
    const [checkinDate, setCheckinDate] = useState<Date>();
    const [checkoutDate, setCheckoutDate] = useState<Date>();
    const [dateTab, setDateTab] = useState<"dates" | "months" | "flexible">("dates");
    const [guests, setGuests] = useState({
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0,
    });

    const updateGuestCount = (type: keyof typeof guests, increment: boolean) => {
        setGuests(prev => ({
            ...prev,
            [type]: Math.max(0, prev[type] + (increment ? 1 : -1))
        }));
    };

    const getTotalGuests = () => {
        return guests.adults + guests.children;
    };

    const getGuestsText = () => {
        const total = getTotalGuests();
        if (total === 0) return "Add guests";

        let text = `${total} guest${total > 1 ? 's' : ''}`;
        if (guests.infants > 0) text += `, ${guests.infants} infant${guests.infants > 1 ? 's' : ''}`;
        if (guests.pets > 0) text += `, ${guests.pets} pet${guests.pets > 1 ? 's' : ''}`;

        return text;
    };

    const quickDateRanges = [
        { label: "Exact dates", days: 0 },
        { label: "± 1 day", days: 1 },
        { label: "± 2 days", days: 2 },
        { label: "± 3 days", days: 3 },
        { label: "± 7 days", days: 7 },
        { label: "± 14 days", days: 14 },
    ];

    const suggestedDestinations = [
        {
            id: "nearby",
            icon: Navigation,
            iconColor: "text-blue-600",
            bgColor: "bg-blue-50",
            title: "Nearby",
            description: "Find what's around you",
        },
        {
            id: "burnaby",
            icon: Building,
            iconColor: "text-green-600",
            bgColor: "bg-green-50",
            title: "Burnaby, Canada",
            description: "For sights like Metropolis at Metrotown",
        },
        {
            id: "rome",
            icon: Landmark,
            iconColor: "text-red-600",
            bgColor: "bg-red-50",
            title: "Rome, Italy",
            description: "For its stunning architecture",
        },
        {
            id: "edmonton",
            icon: Mountain,
            iconColor: "text-blue-600",
            bgColor: "bg-blue-50",
            title: "Edmonton, Canada",
            description: "For a trip abroad",
        },
        {
            id: "chattogram",
            icon: Trees,
            iconColor: "text-green-600",
            bgColor: "bg-green-50",
            title: "Chattogram, Bangladesh",
            description: "A hidden gem",
        },
        {
            id: "saskatoon",
            icon: Waves,
            iconColor: "text-teal-600",
            bgColor: "bg-teal-50",
            title: "Saskatoon, Canada",
            description: "For a trip abroad",
        },
        {
            id: "toronto",
            icon: Building,
            iconColor: "text-gray-600",
            bgColor: "bg-gray-50",
            title: "Toronto, Canada",
            description: "For sights like CN Tower",
        },
        {
            id: "bangkok",
            icon: Zap,
            iconColor: "text-yellow-600",
            bgColor: "bg-yellow-50",
            title: "Bangkok, Thailand",
            description: "For its bustling nightlife",
        },
        {
            id: "london",
            icon: Crown,
            iconColor: "text-purple-600",
            bgColor: "bg-purple-50",
            title: "London, United Kingdom",
            description: "For its stunning architecture",
        },
        {
            id: "newyork",
            icon: Sparkles,
            iconColor: "text-orange-600",
            bgColor: "bg-orange-50",
            title: "New York, NY",
            description: "For its top-notch dining",
        },
        {
            id: "vancouver",
            icon: Trees,
            iconColor: "text-emerald-600",
            bgColor: "bg-emerald-50",
            title: "Vancouver, Canada",
            description: "For nature-lovers",
        },
        {
            id: "paris",
            icon: Heart,
            iconColor: "text-pink-600",
            bgColor: "bg-pink-50",
            title: "Paris, France",
            description: "City of love and lights",
        },
    ];

    const searchFields = [
        {
            id: "where",
            icon: MapPin,
            label: "Where",
            placeholder: "Search destinations",
            value: whereValue,
        },
        {
            id: "checkin",
            icon: Calendar,
            label: "Check in",
            placeholder: "Add dates",
            value: checkinDate ? format(checkinDate, "MMM d") : "",
        },
        {
            id: "checkout",
            icon: Calendar,
            label: "Check out",
            placeholder: "Add dates",
            value: checkoutDate ? format(checkoutDate, "MMM d") : "",
        },
        {
            id: "guests",
            icon: Users,
            label: "Who",
            placeholder: "Add guests",
            value: getGuestsText(),
        },
    ];

    return (
        <div className="flex justify-center px-4 py-6">
            <div className="w-full max-w-4xl ">
                {/* Mobile Search (simplified) */}
                <div className="md:hidden">
                    <div className="flex items-center bg-background border border-border rounded-full px-4 py-3 shadow-airbnb-md shadow-2xl">
                        <Search className="h-5 w-5 text-airbnb-pink mr-3" />
                        <div>
                            <div className="font-medium text-sm">Where to?</div>
                            <div className="text-xs text-muted-foreground">Anywhere • Any week • Add guests</div>
                        </div>
                    </div>
                </div>

                {/* Desktop Search */}
                <div className="hidden md:flex items-center bg-background border border-border rounded-full shadow-airbnb-search hover:shadow-airbnb-search transition-shadow duration-smooth">
                    {searchFields.map((field, index) => (
                        <div key={field.id} className="flex-1 relative">
                            {field.id === "where" ? (
                                <Popover open={isWhereOpen} onOpenChange={setIsWhereOpen}>
                                    <PopoverTrigger asChild>
                                        <button
                                            className={`w-full px-6 py-4 text-left rounded-full transition-colors duration-fast ${isWhereOpen || activeField === field.id
                                                ? "bg-background shadow-airbnb-md"
                                                : "hover:bg-airbnb-gray-light"
                                                }`}
                                            onClick={() => {
                                                setActiveField(activeField === field.id ? null : field.id);
                                                setIsWhereOpen(true);
                                            }}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <field.icon className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <div className="font-medium text-xs text-foreground uppercase tracking-wide">
                                                        {field.label}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground mt-1">
                                                        {field.value || field.placeholder}
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-80 p-0 mt-3 border-0 shadow-airbnb-search rounded-3xl"
                                        align="start"
                                        side="bottom"
                                    >
                                        <div className="p-6">
                                            <h3 className="font-semibold text-sm text-foreground mb-4">
                                                Suggested destinations
                                            </h3>
                                            <div className="space-y-3">
                                                <ScrollArea className="h-64 w-full"> {/* Added explicit height */}
                                                    <div className="space-y-2 pr-4"> {/* Added padding-right for scrollbar space */}
                                                        {suggestedDestinations.map((destination) => (
                                                            <button
                                                                key={destination.id}
                                                                className="w-full flex items-center space-x-4 p-3 rounded-lg hover:bg-airbnb-gray-light transition-colors duration-fast text-left"
                                                                onClick={() => {
                                                                    setWhereValue(destination.title);
                                                                    setIsWhereOpen(false);
                                                                    setActiveField(null);
                                                                }}
                                                            >
                                                                <div className={`flex-shrink-0 w-10 h-10 ${destination.bgColor} rounded-lg flex items-center justify-center`}>
                                                                    <destination.icon className={`h-5 w-5 ${destination.iconColor}`} />
                                                                </div>
                                                                <div>
                                                                    <div className="font-medium text-sm text-foreground">
                                                                        {destination.title}
                                                                    </div>
                                                                    <div className="text-xs text-muted-foreground mt-1">
                                                                        {destination.description}
                                                                    </div>
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </ScrollArea>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            ) : field.id === "checkin" || field.id === "checkout" ? (
                                <Popover
                                    open={field.id === "checkin" ? isCheckinOpen : isCheckoutOpen}
                                    onOpenChange={field.id === "checkin" ? setIsCheckinOpen : setIsCheckoutOpen}
                                >
                                    <PopoverTrigger asChild>
                                        <button
                                            className={`w-full px-6 py-4 text-left rounded-full transition-colors duration-fast ${(field.id === "checkin" ? isCheckinOpen : isCheckoutOpen) || activeField === field.id
                                                ? "bg-background shadow-airbnb-md"
                                                : "hover:bg-airbnb-gray-light"
                                                }`}
                                            onClick={() => {
                                                setActiveField(activeField === field.id ? null : field.id);
                                                if (field.id === "checkin") setIsCheckinOpen(true);
                                                else setIsCheckoutOpen(true);
                                            }}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <field.icon className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <div className="font-medium text-xs text-foreground uppercase tracking-wide">
                                                        {field.label}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground mt-1">
                                                        {field.value || field.placeholder}
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0 mt-3 border-0 shadow-airbnb-search rounded-3xl"
                                        align="start"
                                        side="bottom"
                                    >
                                        <div className="p-6">
                                            {/* Date Tabs */}
                                            <div className="flex space-x-2 mb-6">
                                                {["dates", "months", "flexible"].map((tab) => (
                                                    <button
                                                        key={tab}
                                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-fast ${dateTab === tab
                                                            ? "bg-foreground text-background"
                                                            : "text-muted-foreground hover:text-foreground"
                                                            }`}
                                                        onClick={() => setDateTab(tab as typeof dateTab)}
                                                    >
                                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                                    </button>
                                                ))}
                                            </div>

                                            {dateTab === "dates" && (
                                                <div>
                                                    <CalendarComponent
                                                        mode="range"
                                                        selected={{
                                                            from: checkinDate,
                                                            to: checkoutDate,
                                                        }}
                                                        onSelect={(range) => {
                                                            if (range?.from) setCheckinDate(range.from);
                                                            if (range?.to) setCheckoutDate(range.to);
                                                        }}
                                                        className={cn("p-3 pointer-events-auto")}
                                                        numberOfMonths={2}
                                                        initialFocus
                                                    />

                                                    {/* Quick Date Options */}
                                                    <div className="mt-4 pt-4 border-t border-border">
                                                        <div className="flex flex-wrap gap-2">
                                                            {quickDateRanges.map((range) => (
                                                                <button
                                                                    key={range.label}
                                                                    className="px-3 py-2 text-xs border border-border rounded-full hover:border-foreground transition-colors duration-fast"
                                                                    onClick={() => {
                                                                        const today = new Date();
                                                                        setCheckinDate(today);
                                                                        setCheckoutDate(addDays(today, Math.max(1, range.days)));
                                                                    }}
                                                                >
                                                                    {range.label}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            ) : field.id === "guests" ? (
                                <Popover open={isWhoOpen} onOpenChange={setIsWhoOpen}>
                                    <PopoverTrigger asChild>
                                        <button
                                            className={`w-full px-6 py-4 text-left rounded-full transition-colors duration-fast ${isWhoOpen || activeField === field.id
                                                ? "bg-background shadow-airbnb-md"
                                                : "hover:bg-airbnb-gray-light"
                                                }`}
                                            onClick={() => {
                                                setActiveField(activeField === field.id ? null : field.id);
                                                setIsWhoOpen(true);
                                            }}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <field.icon className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <div className="font-medium text-xs text-foreground uppercase tracking-wide">
                                                        {field.label}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground mt-1">
                                                        {field.value || field.placeholder}
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-96 p-0 mt-3 border-0 shadow-airbnb-search rounded-3xl"
                                        align="end"
                                        side="bottom"
                                    >
                                        <div className="p-6">
                                            <div className="space-y-6">
                                                {/* Adults */}
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="font-medium text-foreground">Adults</div>
                                                        <div className="text-sm text-muted-foreground">Ages 13 or above</div>
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        <button
                                                            className="w-8 h-8 border border-border rounded-full flex items-center justify-center hover:border-foreground transition-colors duration-fast disabled:opacity-50 disabled:cursor-not-allowed"
                                                            onClick={() => updateGuestCount("adults", false)}
                                                            disabled={guests.adults === 0}
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </button>
                                                        <span className="w-8 text-center font-medium">{guests.adults}</span>
                                                        <button
                                                            className="w-8 h-8 border border-border rounded-full flex items-center justify-center hover:border-foreground transition-colors duration-fast"
                                                            onClick={() => updateGuestCount("adults", true)}
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Children */}
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="font-medium text-foreground">Children</div>
                                                        <div className="text-sm text-muted-foreground">Ages 2–12</div>
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        <button
                                                            className="w-8 h-8 border border-border rounded-full flex items-center justify-center hover:border-foreground transition-colors duration-fast disabled:opacity-50 disabled:cursor-not-allowed"
                                                            onClick={() => updateGuestCount("children", false)}
                                                            disabled={guests.children === 0}
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </button>
                                                        <span className="w-8 text-center font-medium">{guests.children}</span>
                                                        <button
                                                            className="w-8 h-8 border border-border rounded-full flex items-center justify-center hover:border-foreground transition-colors duration-fast"
                                                            onClick={() => updateGuestCount("children", true)}
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Infants */}
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="font-medium text-foreground">Infants</div>
                                                        <div className="text-sm text-muted-foreground">Under 2</div>
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        <button
                                                            className="w-8 h-8 border border-border rounded-full flex items-center justify-center hover:border-foreground transition-colors duration-fast disabled:opacity-50 disabled:cursor-not-allowed"
                                                            onClick={() => updateGuestCount("infants", false)}
                                                            disabled={guests.infants === 0}
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </button>
                                                        <span className="w-8 text-center font-medium">{guests.infants}</span>
                                                        <button
                                                            className="w-8 h-8 border border-border rounded-full flex items-center justify-center hover:border-foreground transition-colors duration-fast"
                                                            onClick={() => updateGuestCount("infants", true)}
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Pets */}
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="font-medium text-foreground">Pets</div>
                                                        <div className="text-sm text-muted-foreground">
                                                            <button className="text-foreground underline hover:no-underline">
                                                                Bringing a service animal?
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        <button
                                                            className="w-8 h-8 border border-border rounded-full flex items-center justify-center hover:border-foreground transition-colors duration-fast disabled:opacity-50 disabled:cursor-not-allowed"
                                                            onClick={() => updateGuestCount("pets", false)}
                                                            disabled={guests.pets === 0}
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </button>
                                                        <span className="w-8 text-center font-medium">{guests.pets}</span>
                                                        <button
                                                            className="w-8 h-8 border border-border rounded-full flex items-center justify-center hover:border-foreground transition-colors duration-fast"
                                                            onClick={() => updateGuestCount("pets", true)}
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            ) : (
                                <button
                                    className={`w-full px-6 py-4 text-left rounded-full transition-colors duration-fast ${activeField === field.id
                                        ? "bg-background shadow-airbnb-md"
                                        : "hover:bg-airbnb-gray-light"
                                        }`}
                                    onClick={() => setActiveField(activeField === field.id ? null : field.id)}
                                >
                                    <div className="flex items-center space-x-3">
                                        <field.icon className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <div className="font-medium text-xs text-foreground uppercase tracking-wide">
                                                {field.label}
                                            </div>
                                            <div className="text-sm text-muted-foreground mt-1">
                                                {field.value || field.placeholder}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            )}

                            {/* Divider */}
                            {index < searchFields.length - 1 && (
                                <div className="w-px h-8 bg-border absolute right-0 top-1/2 transform -translate-y-1/2"
                                    style={{ marginRight: '-0.5px' }} />
                            )}
                        </div>
                    ))}

                    {/* Search Button */}
                    <div className="px-2 py-2">
                        <Button
                            size="icon"
                            className="bg-rose-300 hover:bg-airbnb-pink-dark text-rose-600 rounded-full w-12 h-12 shadow-lg p-3 transition-all duration-fast hover:scale-105"
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;