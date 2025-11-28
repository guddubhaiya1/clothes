import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SizeGuide() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Size Guide</h1>
          <p className="text-lg text-muted-foreground">
            Find your perfect fit. All measurements are in centimeters.
          </p>
        </div>
      </section>

      {/* Size Charts */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="tshirt" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="tshirt">T-Shirt</TabsTrigger>
              <TabsTrigger value="hoodie">Hoodie</TabsTrigger>
              <TabsTrigger value="sweatshirt">Sweatshirt</TabsTrigger>
            </TabsList>

            <TabsContent value="tshirt">
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-6">T-Shirt Size Guide (India)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-bold">Size</th>
                        <th className="text-left py-3 px-4 font-bold">Chest (cm)</th>
                        <th className="text-left py-3 px-4 font-bold">Length (cm)</th>
                        <th className="text-left py-3 px-4 font-bold">Sleeve (cm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { size: "XS", chest: "34-36", length: "66", sleeve: "17" },
                        { size: "S", chest: "36-38", length: "69", sleeve: "18" },
                        { size: "M", chest: "38-40", length: "71", sleeve: "19" },
                        { size: "L", chest: "40-42", length: "74", sleeve: "20" },
                        { size: "XL", chest: "42-44", length: "76", sleeve: "21" },
                        { size: "XXL", chest: "44-46", length: "79", sleeve: "22" },
                        { size: "3XL", chest: "46-48", length: "81", sleeve: "23" },
                      ].map((row, idx) => (
                        <tr key={idx} className="border-b border-border">
                          <td className="py-3 px-4 font-semibold">{row.size}</td>
                          <td className="py-3 px-4">{row.chest}</td>
                          <td className="py-3 px-4">{row.length}</td>
                          <td className="py-3 px-4">{row.sleeve}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-muted-foreground text-sm mt-6">
                  💡 <strong>Tip:</strong> All measurements are taken flat. For a fitted look, choose your regular size. For an oversized look, go up one size.
                </p>
              </Card>
            </TabsContent>

            <TabsContent value="hoodie">
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-6">Hoodie Size Guide (India)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-bold">Size</th>
                        <th className="text-left py-3 px-4 font-bold">Chest (cm)</th>
                        <th className="text-left py-3 px-4 font-bold">Length (cm)</th>
                        <th className="text-left py-3 px-4 font-bold">Sleeve (cm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { size: "XS", chest: "36-38", length: "69", sleeve: "57" },
                        { size: "S", chest: "38-40", length: "71", sleeve: "59" },
                        { size: "M", chest: "40-42", length: "74", sleeve: "61" },
                        { size: "L", chest: "42-44", length: "76", sleeve: "63" },
                        { size: "XL", chest: "44-46", length: "79", sleeve: "65" },
                        { size: "XXL", chest: "46-48", length: "81", sleeve: "67" },
                        { size: "3XL", chest: "48-50", length: "84", sleeve: "69" },
                      ].map((row, idx) => (
                        <tr key={idx} className="border-b border-border">
                          <td className="py-3 px-4 font-semibold">{row.size}</td>
                          <td className="py-3 px-4">{row.chest}</td>
                          <td className="py-3 px-4">{row.length}</td>
                          <td className="py-3 px-4">{row.sleeve}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-muted-foreground text-sm mt-6">
                  💡 <strong>Tip:</strong> Hoodies have a relaxed fit. If between sizes, choose the smaller size for a more fitted look.
                </p>
              </Card>
            </TabsContent>

            <TabsContent value="sweatshirt">
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-6">Sweatshirt Size Guide (India)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-bold">Size</th>
                        <th className="text-left py-3 px-4 font-bold">Chest (cm)</th>
                        <th className="text-left py-3 px-4 font-bold">Length (cm)</th>
                        <th className="text-left py-3 px-4 font-bold">Sleeve (cm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { size: "XS", chest: "36-38", length: "66", sleeve: "56" },
                        { size: "S", chest: "38-40", length: "69", sleeve: "58" },
                        { size: "M", chest: "40-42", length: "71", sleeve: "60" },
                        { size: "L", chest: "42-44", length: "74", sleeve: "62" },
                        { size: "XL", chest: "44-46", length: "76", sleeve: "64" },
                        { size: "XXL", chest: "46-48", length: "79", sleeve: "66" },
                        { size: "3XL", chest: "48-50", length: "81", sleeve: "68" },
                      ].map((row, idx) => (
                        <tr key={idx} className="border-b border-border">
                          <td className="py-3 px-4 font-semibold">{row.size}</td>
                          <td className="py-3 px-4">{row.chest}</td>
                          <td className="py-3 px-4">{row.length}</td>
                          <td className="py-3 px-4">{row.sleeve}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-muted-foreground text-sm mt-6">
                  💡 <strong>Tip:</strong> Sweatshirts offer a comfortable, relaxed fit. Perfect for layering in Indian winters.
                </p>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Tips */}
          <Card className="p-8 mt-12 bg-card">
            <h3 className="text-2xl font-bold mb-6">How to Measure Yourself</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold mb-2">Chest</h4>
                <p className="text-muted-foreground">
                  Measure around the fullest part of your chest with arms relaxed at your sides.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Length</h4>
                <p className="text-muted-foreground">
                  Measure from the top of your shoulder down to where you want the garment to end.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Sleeve</h4>
                <p className="text-muted-foreground">
                  Measure from the center back neck, across the shoulder, down the arm to the wrist.
                </p>
              </div>
            </div>
          </Card>

          {/* Care Instructions */}
          <Card className="p-8 mt-8 bg-card">
            <h3 className="text-2xl font-bold mb-6">Care Instructions</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong>Wash:</strong> Wash in cool water (max 30°C) with similar colors</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong>Dry:</strong> Air dry or tumble dry on low heat</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong>Iron:</strong> Iron on medium heat if needed (inside out for prints)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong>Storage:</strong> Store in a cool, dry place away from direct sunlight</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>
    </div>
  );
}
