"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Link as LinkIcon, Zap } from "lucide-react";
// If you use shadcn/ui keep these; otherwise swap to your own components (see note below)
const Badge = ({ className = "", children }) => <div className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs ${className}`}>{children}</div>;
const Button = ({ className = "", children, ...props }) => <button className={`inline-flex items-center rounded-md border px-2 py-1 text-xs ${className}`} {...props}>{children}</button>;
const Card = ({ className = "", children }) => <div className={`rounded-2xl border p-4 ${className}`}>{children}</div>;
const CardHeader = ({ className = "", children }) => <div className={`mb-2 ${className}`}>{children}</div>;
const CardTitle = ({ className = "", children }) => <h3 className={`text-sm font-semibold ${className}`}>{children}</h3>;
const CardContent = ({ className = "", children }) => <div className={`text-xs ${className}`}>{children}</div>;

export default function RadialOrbitalTimeline({ timelineData = [] }) {
  const [expandedItems, setExpandedItems] = useState({});
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState({});
  const [activeNodeId, setActiveNodeId] = useState(null);

  const containerRef = useRef(null);
  const orbitRef = useRef(null);
  const nodeRefs = useRef({});

  const handleContainerClick = (e) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id) => {
    setExpandedItems((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => {
        if (parseInt(k) !== id) next[parseInt(k)] = false;
      });
      next[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const nextPulse = {};
        relatedItems.forEach((relId) => (nextPulse[relId] = true));
        setPulseEffect(nextPulse);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }
      return next;
    });
  };

  useEffect(() => {
    let timer;
    if (autoRotate) {
      timer = setInterval(() => {
        setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)));
      }, 50);
    }
    return () => timer && clearInterval(timer);
  }, [autoRotate]);

  const centerViewOnNode = (nodeId) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length || 1;
    const targetAngle = (nodeIndex / totalNodes) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index, total) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 200;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));

    return { x, y, zIndex, opacity };
  };

  const getRelatedItems = (itemId) => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId) => {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "completed":
        return "text-[#EEE7D2] bg-black border-[#EEE7D2]";
      case "in-progress":
        return "text-black bg-[#EEE7D2] border-black";
      default:
        return "text-[#EEE7D2] bg-black/40 border-[#EEE7D2]/50";
    }
  };

  return (
      <section
          className="w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden text-[#EEE7D2]"
          ref={containerRef}
          onClick={handleContainerClick}
      >
        <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
          <div
              className="absolute w-full h-full flex items-center justify-center"
              ref={orbitRef}
              style={{ perspective: "1000px" }}
          >
            {/* nucleus */}
            <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 animate-pulse flex items-center justify-center z-10">
              <div className="absolute w-20 h-20 rounded-full border border-white/20 animate-ping opacity-70" />
              <div
                  className="absolute w-24 h-24 rounded-full border border-white/10 animate-ping opacity-50"
                  style={{ animationDelay: "0.5s" }}
              />
              <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md" />
            </div>

            {/* orbit ring */}
            <div className="absolute w-96 h-96 rounded-full border border-white/10" />

            {/* nodes */}
            {timelineData.map((item, index) => {
              const pos = calculateNodePosition(index, timelineData.length);
              const isExpanded = !!expandedItems[item.id];
              const isRelated = isRelatedToActive(item.id);
              const isPulsing = !!pulseEffect[item.id];
              const Icon = item.icon;

              const nodeStyle = {
                transform: `translate(${pos.x}px, ${pos.y}px)`,
                zIndex: isExpanded ? 200 : pos.zIndex,
                opacity: isExpanded ? 1 : pos.opacity,
              };

              return (
                  <div
                      key={item.id}
                      ref={(el) => (nodeRefs.current[item.id] = el)}
                      className="absolute transition-all duration-700 cursor-pointer"
                      style={nodeStyle}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleItem(item.id);
                      }}
                  >
                    {/* aura */}
                    <div
                        className={`absolute rounded-full -inset-1 ${isPulsing ? "animate-pulse duration-1000" : ""}`}
                        style={{
                          background: `radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)`,
                          width: `${item.energy * 0.5 + 40}px`,
                          height: `${item.energy * 0.5 + 40}px`,
                          left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                          top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                        }}
                    />

                    {/* node */}
                    <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 transform
                    ${
                            isExpanded
                                ? "bg-[#EEE7D2] text-black border-[#EEE7D2] shadow-lg shadow-[#EEE7D2]/30 scale-150"
                                : isRelated
                                    ? "bg-[#EEE7D2]/60 text-black border-[#EEE7D2] animate-pulse"
                                    : "bg-black text-[#EEE7D2] border-[#EEE7D2]/40"
                        }`}
                    >
                      <Icon size={16} />
                    </div>

                    {/* label */}
                    <div
                        className={`absolute top-12 whitespace-nowrap text-xs font-semibold tracking-wider transition-all duration-300
                    ${isExpanded ? "text-[#EEE7D2] scale-125" : "text-[#EEE7D2]/70"}`}
                    >
                      {item.title}
                    </div>

                    {/* expanded card */}
                    {isExpanded && (
                        <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-black/90 backdrop-blur-lg border-[#EEE7D2]/30 shadow-xl shadow-[#EEE7D2]/10 overflow-visible">
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-[#EEE7D2]/50" />
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-center">
                              <Badge className={`px-2 text-xs ${getStatusStyles(item.status)}`}>
                                {item.status === "completed"
                                    ? "COMPLETE"
                                    : item.status === "in-progress"
                                        ? "IN PROGRESS"
                                        : "PENDING"}
                              </Badge>
                              <span className="text-xs font-mono text-[#EEE7D2]/60">{item.date}</span>
                            </div>
                            <CardTitle className="text-sm mt-2 text-[#EEE7D2]">{item.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="text-xs text-[#EEE7D2]/80">
                            <p>{item.content}</p>

                            <div className="mt-4 pt-3 border-t border-[#EEE7D2]/10">
                              <div className="flex justify-between items-center text-xs mb-1">
                                <span className="flex items-center"><Zap size={10} className="mr-1" />Energy Level</span>
                                <span className="font-mono">{item.energy}%</span>
                              </div>
                              <div className="w-full h-1 bg-[#EEE7D2]/10 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: `${item.energy}%` }} />
                              </div>
                            </div>

                            {item.relatedIds?.length > 0 && (
                                <div className="mt-4 pt-3 border-t border-[#EEE7D2]/10">
                                  <div className="flex items-center mb-2">
                                    <LinkIcon size={10} className="text-[#EEE7D2]/70 mr-1" />
                                    <h4 className="text-xs uppercase tracking-wider font-medium text-[#EEE7D2]/70">Connected Nodes</h4>
                                  </div>
                                  <div className="flex flex-wrap gap-1">
                                    {item.relatedIds.map((relatedId) => {
                                      const relatedItem = timelineData.find((i) => i.id === relatedId);
                                      return (
                                          <Button
                                              key={relatedId}
                                              variant="outline"
                                              size="sm"
                                              className="flex items-center h-6 px-2 py-0 text-xs rounded-none border-[#EEE7D2]/20 bg-transparent hover:bg-[#EEE7D2]/10 text-[#EEE7D2]/80 hover:text-[#EEE7D2] transition-all"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                toggleItem(relatedId);
                                              }}
                                          >
                                            {relatedItem?.title}
                                            <ArrowRight size={8} className="ml-1 text-[#EEE7D2]/60" />
                                          </Button>
                                      );
                                    })}
                                  </div>
                                </div>
                            )}
                          </CardContent>
                        </Card>
                    )}
                  </div>
              );
            })}
          </div>
        </div>
      </section>
  );
}
