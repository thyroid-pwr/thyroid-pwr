export function IntroSection() {
    return (
        <section className="space-y-8">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Introduction
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
                ThyroID is a group project created as a part of Research and Implementation Project course at the Wroclaw University of Science and Technology.
                We aim to develop a system for automatic identification of malignancy of thyroid nodules in ultrasound images using deep learning techniques.
                Currently, we focus on use of unsupervised learning methods, specifically DINO (self-distillation with no labels) and contrastive learning.
                We also propose a novel approach to explainable AI in the context of thyroid ultrasound images.
            </p>
        </section>
    );
    }