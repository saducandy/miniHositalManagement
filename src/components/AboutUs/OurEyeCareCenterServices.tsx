import React, { useState, useEffect, useContext } from "react";
import {
  Eye,
  Stethoscope,
  Scissors,
  Circle,
  Droplet,
  Glasses,
  Baby,
  Shield,
  Microscope,
} from "lucide-react";
import { getApiUrl, getImageUrl } from "../../config/api";
import { I18nContext } from "../../context/I18nContext";

interface ApiServiceItem {
  id: number;
  documentId: string;
  title: string;
  title_AM: string;
  descreption: string;
  descreption_AM: string;
  mainTitle: string;
  mainTitle_AM: string;
  mainDescription: string;
  mainDescription_AM: string;
  mainTitleAndDescriptionOrder: number;
  starSeparatedBuletPoints: string;
  starSeparatedBuletPoints_AM: string;
  image: {
    url: string;
  } | null;
}

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  bulletPoints: Array<{ title: string; description: string }>;
  imageUrl: string;
}

interface ServiceGroup {
  mainTitle: string;
  mainDescription: string;
  mainTitleAndDescriptionOrder: number;
  items: ServiceItem[];
}

const getGroupIcon = (mainTitle: string): React.ReactNode => {
  // Check for common keywords in the title to determine icon
  const titleLower = mainTitle.toLowerCase();
  if (
    titleLower.includes("general") ||
    titleLower.includes("primary") ||
    titleLower.includes("አጠቃላይ")
  ) {
    return <Eye className="h-10 w-10" style={{ color: "#77a867" }} />;
  }
  if (
    titleLower.includes("specialized") ||
    titleLower.includes("surgical") ||
    titleLower.includes("medical") ||
    titleLower.includes("ልዩ")
  ) {
    return <Stethoscope className="h-10 w-10" style={{ color: "#77a867" }} />;
  }
  if (
    titleLower.includes("diagnostic") ||
    titleLower.includes("allied") ||
    titleLower.includes("የምርመራ")
  ) {
    return <Microscope className="h-10 w-10" style={{ color: "#77a867" }} />;
  }
  return <Eye className="h-10 w-10" style={{ color: "#77a867" }} />;
};

const parseBulletPoints = (
  pointsString: string
): Array<{ title: string; description: string }> => {
  if (!pointsString) return [];

  return pointsString
    .split("*")
    .map((point) => {
      const trimmedPoint = point.trim();
      if (!trimmedPoint) return null;

      // Check if the point contains a colon (title:description format)
      if (trimmedPoint.includes(":")) {
        const [title, ...descriptionParts] = trimmedPoint.split(":");
        return {
          title: title.trim(),
          description: descriptionParts.join(":").trim(),
        };
      } else {
        // If no colon, treat the whole string as description
        return {
          title: "",
          description: trimmedPoint,
        };
      }
    })
    .filter(
      (point): point is { title: string; description: string } =>
        point !== null && point.description.length > 0
    );
};

export const OurEyeCareCenterServices: React.FC = () => {
  const { language } = useContext(I18nContext);
  const [serviceGroups, setServiceGroups] = useState<ServiceGroup[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(
          getApiUrl("api/ec-our-service-eye-cares?populate=*"),
          {
            signal: controller.signal,
          }
        );
        if (!res.ok) throw new Error(`Failed to load services: ${res.status}`);
        const json: { data: ApiServiceItem[] } = await res.json();

        // Group services by mainTitle and mainDescription
        const groupedMap = new Map<string, ServiceGroup>();

        (json.data || []).forEach((item) => {
          const mainTitle =
            language === "am" ? item.mainTitle_AM : item.mainTitle;
          const mainDescription =
            language === "am" ? item.mainDescription_AM : item.mainDescription;
          const groupKey = `${mainTitle}|${mainDescription}`;

          if (!groupedMap.has(groupKey)) {
            groupedMap.set(groupKey, {
              mainTitle,
              mainDescription,
              mainTitleAndDescriptionOrder:
                item.mainTitleAndDescriptionOrder || 0,
              items: [],
            });
          }

          const group = groupedMap.get(groupKey)!;
          const imagePath = item?.image?.url || "";
          const absoluteUrl = getImageUrl(imagePath);
          const bulletPointsString =
            language === "am"
              ? item.starSeparatedBuletPoints_AM
              : item.starSeparatedBuletPoints;

          group.items.push({
            id: item.id,
            title: language === "am" ? item.title_AM : item.title,
            description:
              language === "am" ? item.descreption_AM : item.descreption,
            bulletPoints: parseBulletPoints(bulletPointsString),
            imageUrl: absoluteUrl,
          });
        });

        // Sort groups by mainTitleAndDescriptionOrder (ascending order - top to bottom)
        const sortedGroups = Array.from(groupedMap.values()).sort(
          (a, b) =>
            a.mainTitleAndDescriptionOrder - b.mainTitleAndDescriptionOrder
        );

        setServiceGroups(sortedGroups);
      } catch (err: any) {
        if (err?.name !== "AbortError")
          setError(err?.message || "Failed to load services");
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
    return () => controller.abort();
  }, [language]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="text-white py-16"
        style={{ background: `linear-gradient(to right, #32705a, #77a867)` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Eye Care Center Services
          </h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: "#f0f8f4" }}>
            Comprehensive eye care services delivered with expertise and
            compassion
          </p>
        </div>
      </section>

      {/* Dynamic Service Groups */}
      {serviceGroups.map((group, groupIndex) => {
        const isEvenGroup = groupIndex % 2 === 0;
        const bgColor = isEvenGroup ? "bg-white" : "bg-gray-50";
        const isSingleItem = group.items.length === 1;
        const firstItem = group.items[0];

        // For single item groups, render in a simple layout
        if (isSingleItem) {
          return (
            <section key={groupIndex} className={`py-16 ${bgColor}`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="mr-4">
                        {getGroupIcon(group.mainTitle)}
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        {group.mainTitle}
                      </h2>
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                      {group.mainDescription}
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                      {firstItem.description}
                    </p>
                    {firstItem.bulletPoints.length > 0 && (
                      <ul className="space-y-4">
                        {firstItem.bulletPoints.map((point, idx) => (
                          <li key={idx} className="flex items-start">
                            <div
                              className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0"
                              style={{ backgroundColor: "#77a867" }}
                            ></div>
                            <div>
                              {point.title ? (
                                <>
                                  <strong className="text-gray-900">
                                    {point.title}:
                                  </strong>
                                  <span className="text-gray-700 ml-2">
                                    {point.description}
                                  </span>
                                </>
                              ) : (
                                <span className="text-gray-700">
                                  {point.description}
                                </span>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {firstItem.imageUrl && (
                    <div>
                      <img
                        src={firstItem.imageUrl}
                        alt={firstItem.title}
                        className="rounded-2xl shadow-xl w-full h-auto object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>
          );
        }

        // For multiple items, render with main title/description header and items below
        return (
          <section key={groupIndex} className={`py-16 ${bgColor}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-6">
                  <div className="mr-4">{getGroupIcon(group.mainTitle)}</div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    {group.mainTitle}
                  </h2>
                </div>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {group.mainDescription}
                </p>
              </div>

              {group.items.map((item, itemIndex) => {
                const isEvenItem = itemIndex % 2 === 0;
                const iconColors = ["#77a867", "#32705a", "#fbce6e"];
                const iconColor = iconColors[itemIndex % iconColors.length];
                const iconComponents = [
                  <Scissors
                    key="scissors"
                    className="h-8 w-8 mr-3"
                    style={{ color: iconColor }}
                  />,
                  <Circle
                    key="circle"
                    className="h-8 w-8 mr-3"
                    style={{ color: iconColor }}
                  />,
                  <Droplet
                    key="droplet"
                    className="h-8 w-8 mr-3"
                    style={{ color: iconColor }}
                  />,
                  <Eye
                    key="eye"
                    className="h-8 w-8 mr-3"
                    style={{ color: iconColor }}
                  />,
                  <Glasses
                    key="glasses"
                    className="h-8 w-8 mr-3"
                    style={{ color: iconColor }}
                  />,
                  <Baby
                    key="baby"
                    className="h-8 w-8 mr-3"
                    style={{ color: iconColor }}
                  />,
                  <Shield
                    key="shield"
                    className="h-8 w-8 mr-3"
                    style={{ color: iconColor }}
                  />,
                ];
                const IconComponent =
                  iconComponents[itemIndex % iconComponents.length];

                return (
                  <div
                    key={item.id}
                    className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                      <div className={isEvenItem ? "" : "order-2 lg:order-1"}>
                        {item.imageUrl && (
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="rounded-xl shadow-lg w-full h-64 object-cover"
                          />
                        )}
                      </div>
                      <div className={isEvenItem ? "" : "order-1 lg:order-2"}>
                        <div className="flex items-center mb-4">
                          {IconComponent}
                          <h3 className="text-2xl font-bold text-gray-900">
                            {itemIndex + 1}. {item.title}
                          </h3>
                        </div>
                        <p className="text-gray-700 mb-4">{item.description}</p>
                        {item.bulletPoints.length > 0 && (
                          <ul className="space-y-2">
                            {item.bulletPoints.map((point, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-gray-700 mr-2">•</span>
                                <span className="text-gray-700">
                                  {point.title ? (
                                    <>
                                      <strong>{point.title}:</strong>{" "}
                                      {point.description}
                                    </>
                                  ) : (
                                    point.description
                                  )}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* Call to Action */}
      <section
        className="py-16 text-white"
        style={{ background: `linear-gradient(to right, #32705a, #77a867)` }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Expert Eye Care You Can Trust
          </h2>
          <p className="text-xl mb-8" style={{ color: "#f0f8f4" }}>
            Our comprehensive range of services ensures that all your eye care
            needs are met under one roof, with the highest standards of medical
            excellence.
          </p>
        </div>
      </section>
    </div>
  );
};
