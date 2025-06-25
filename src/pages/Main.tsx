import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import team from "@/assets/zespol.jpg";
import logo1 from "@/assets/logo.png";
import logo2 from "@/assets/logo2.png";

export function Page1() {
  return (
    <div className="p-10 bg-white text-gray-800 font-sans space-y-10">
      {/* TITLE */}
      <div className="text-center scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        <h1 className="text-4xl font-bold text-blue-900 mb-2">
          thyroID
        </h1>
        <p className="text-lg text-gray-600">
          AI-powered assistant for improving thyroid cancer diagnosis from ultrasound imaging.
        </p>
      </div>

      {/* TEAM PHOTO */}
      <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[52rem] bg-gray-200 rounded-2xl shadow-inner overflow-hidden">
  <img src={team} alt="Team Photo" className="w-full h-full object-cover" />
</div>


      {/* CARDS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Background */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              Background
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc ml-5 space-y-2 text-base">
              <li>
                <strong>Prevalence:</strong> Around 3,000 thyroid cancer cases are diagnosed annually in Poland.
              </li>
              <li>
                <strong>Diagnostic uncertainty:</strong> In over 20% of cases, results are inconclusive.
              </li>
              <li>
                <strong>Unnecessary surgeries:</strong> 60% of thyroid removal surgeries are unnecessary.
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Project Goals */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              Project Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc ml-5 space-y-2 text-base">
              <li>
                <strong>Main goal:</strong> Identify differences between benign and malignant thyroid nodules using ultrasound.
              </li>
              <li>
                <strong>Additional goal:</strong> Build a system to improve diagnostic accuracy.
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Project Progress */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              Project Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc ml-5 space-y-2 text-base">
              <li>Collected and preprocessed ultrasound dataset</li>
              <li>Implemented thyroid segmentation module</li>
              <li>Tested malignancy classification models</li>
              <li>Explored attention-based explainability</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* LOGO / FIGURES SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center pt-4">
        <div className="w-full h-40  flex items-center justify-center  overflow-hidden">
          <img src={logo1} alt="Team Logo 1" className="object-contain h-full p-4" />
        </div>
        <div className="w-full h-40  flex items-center justify-center  overflow-hidden">
          <img src={logo2} alt="Team Logo 2" className="object-contain h-full p-4" />
        </div>
      </div>

      {/* TEAM INFO */}
      <div className="flex flex-col items-center justify-center border-t pt-6 text-base text-center">
        <h3 className="text-xl font-semibold mb-2 text-blue-800">Project Team</h3>
        <p>Piotr Durniat, Tomasz Hałas , Jakub Kukowski, Wiktor Sadowy </p>

        <h3 className="text-xl font-semibold mt-4 mb-2 text-blue-800">Scientific Supervisor</h3>
        <p>Prof. dr hab. inż. Halina Kwaśnicka</p>

        <h3 className="text-xl font-semibold mt-4 mb-2 text-blue-800">Didactic Support</h3>
        <p>dr n. med. Tomasz Tomkalski</p>
      </div>
    </div>
  );
}
