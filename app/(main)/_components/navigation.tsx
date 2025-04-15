"use client"

const Navigation = () => {
    return (
        <>
            <aside className="group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]">
                <div>
                    <p>Action items</p>
                </div>
                <div className="mt-4">
                    <p>Documents</p>
                </div>
            </aside>
        </>
    );
}

export default Navigation;