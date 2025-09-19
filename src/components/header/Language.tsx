import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Globe } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export const LanguageModal = () => {
    const languages = [
        {
            languageCode: "uk-UA",
            languageName: "Українська",
            countryName: "Україна",
            link: "/homes?locale=uk&country_override=UA"
        },
        {
            languageCode: "en-US",
            languageName: "English",
            countryName: "United States",
            link: "/homes?locale=en&country_override=US"
        },
        {
            languageCode: "es-ES",
            languageName: "Español",
            countryName: "España",
            link: "/homes?locale=es&country_override=ES"
        },
        {
            languageCode: "fr-FR",
            languageName: "Français",
            countryName: "France",
            link: "/homes?locale=fr&country_override=FR"
        },
        {
            languageCode: "de-DE",
            languageName: "Deutsch",
            countryName: "Deutschland",
            link: "/homes?locale=de&country_override=DE"
        },
        {
            languageCode: "it-IT",
            languageName: "Italiano",
            countryName: "Italia",
            link: "/homes?locale=it&country_override=IT"
        },
        {
            languageCode: "pt-BR",
            languageName: "Português",
            countryName: "Brasil",
            link: "/homes?locale=pt&country_override=BR"
        },
        {
            languageCode: "nl-NL",
            languageName: "Nederlands",
            countryName: "Nederland",
            link: "/homes?locale=nl&country_override=NL"
        },
        {
            languageCode: "pl-PL",
            languageName: "Polski",
            countryName: "Polska",
            link: "/homes?locale=pl&country_override=PL"
        },
        {
            languageCode: "ja-JP",
            languageName: "日本語",
            countryName: "日本",
            link: "/homes?locale=ja&country_override=JP"
        },
        {
            languageCode: "zh-CN",
            languageName: "简体中文",
            countryName: "中国",
            link: "/homes?locale=zh&country_override=CN"
        },
        {
            languageCode: "ko-KR",
            languageName: "한국어",
            countryName: "대한민국",
            link: "/homes?locale=ko&country_override=KR"
        },
        {
            languageCode: "ar-SA",
            languageName: "العربية",
            countryName: "السعودية",
            link: "/homes?locale=ar&country_override=SA"
        },
        {
            languageCode: "hi-IN",
            languageName: "हिन्दी",
            countryName: "भारत",
            link: "/homes?locale=hi&country_override=IN"
        },
        {
            languageCode: "tr-TR",
            languageName: "Türkçe",
            countryName: "Türkiye",
            link: "/homes?locale=tr&country_override=TR"
        }
    ];

    const [isOpen, setIsOpen] = useState(false);
    const [enabled, setEnabled] = useState(true);
    const [selected, setSelected] = useState('');

    const handleSelect = (lang: string) => {
        setSelected(lang);
        // Simulate switching locale — in real app you could:
        // window.location.href = lang.link
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                    <Globe size={18} />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[85vh] w-full overflow-hidden">
                <div className="w-full overflow-hidden">
                    <Tabs defaultValue="language" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="language">Language & Region</TabsTrigger>
                            <TabsTrigger value="currency">Currency</TabsTrigger>
                        </TabsList>

                        <TabsContent value="language" className="mt-6 space-y-6 overflow-hidden">
                            {/* Translation Toggle Section */}
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-gray-800">
                                                        Translation
                                                    </span>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 16 16"
                                                        aria-hidden="true"
                                                        className="h-4 w-4 text-gray-500"
                                                    >
                                                        <path d="M9 0a1 1 0 0 1 1 .88V6h5a1 1 0 0 1 1 .88V15a1 1 0 0 1-.88 1H7a1 1 0 0 1-1-.88V10H1a1 1 0 0 1-1-.88V1a1 1 0 0 1 .88-1H9zm1.73 7-1.4.5.24.21.13.13c.12.13.23.25.3.36l.08.1.05.07.04.08H7.31v1.3h1.2l.17.53.1.26.1.3A6.3 6.3 0 0 0 10 12.61c-.5.32-1.12.61-1.87.87l-.33.11-.35.11-.44.14.72 1.15.4-.13.4-.12c1-.35 1.83-.76 2.48-1.22.57.4 1.28.77 2.12 1.08l.37.14.38.12.41.13.72-1.15-.45-.14-.26-.08-.34-.11a9.23 9.23 0 0 1-1.94-.9 6.3 6.3 0 0 0 1.07-1.7l.13-.31.11-.33.17-.52h1.2V8.45h-3.05l-.1-.23A3.7 3.7 0 0 0 11 7.3l-.12-.15-.14-.15zm1.35 2.76-.04.13-.08.22-.1.27a4.99 4.99 0 0 1-.86 1.38 4.95 4.95 0 0 1-.74-1.13l-.12-.25-.1-.27-.08-.22-.04-.13h2.16zM9 1H1v8h5V7l.01-.17H3.83L3.43 8H2l2.26-6h1.48l1.5 4H9V1zM5 3.41 4.25 5.6h1.5L5 3.41z"></path>
                                                    </svg>
                                                </div>
                                                <div className="text-sm text-gray-500 mt-1">
                                                    Automatically translate descriptions and reviews to English.
                                                </div>
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setEnabled(!enabled)}
                                            className={`relative w-11 h-6 rounded-full p-0 ${enabled ? "bg-blue-600 border-blue-600" : "bg-gray-200"
                                                }`}
                                        >
                                            <span
                                                className={`block w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${enabled ? "translate-x-5" : "translate-x-1"
                                                    }`}
                                            />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Suggested Language Section */}
                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Suggested language and region
                                </h3>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start p-4 h-auto"
                                    onClick={() => handleSelect(languages[1]["languageCode"])} // English US as suggested
                                >
                                    <div className="text-left">
                                        <div className="font-medium">English</div>
                                        <div className="text-sm text-gray-500">United States</div>
                                    </div>
                                </Button>
                            </div>

                            {/* All Languages Section */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Choose a language and region
                                </h3>
                                <ScrollArea className="max-h-[250px] border rounded-lg overflow-hidden overflow-y-auto">
                                    <div className="p-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {languages.map((lang) => (
                                                <Button
                                                    key={lang.languageCode}
                                                    variant={selected === lang.languageCode ? "default" : "outline"}
                                                    onClick={() => handleSelect(lang.languageCode)}
                                                    lang={lang.languageCode}
                                                    className="h-auto p-3 justify-start"
                                                >
                                                    <div className="text-left">
                                                        <div className="font-medium text-sm">
                                                            {lang.languageName}
                                                        </div>
                                                        <div className="text-xs opacity-70 mt-1">
                                                            {lang.countryName}
                                                        </div>
                                                    </div>
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                </ScrollArea>
                            </div>
                        </TabsContent>

                        <TabsContent value="currency" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Currency</CardTitle>
                                    <CardDescription>
                                        Choose your preferred currency for pricing display.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-gray-600">Currency selection feature coming soon...</p>
                                </CardContent>
                                <CardFooter>
                                    <Button>Save preferences</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </DialogContent>
        </Dialog>
    );
};