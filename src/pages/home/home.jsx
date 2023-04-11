import './home.css';
import SliderHome from '../../components/slider/slider';
import PostBox from '../../components/post_box/post_box';
import NotificationMessage from '../../components/notification_message/notification_message';
import { useState } from 'react';
function Home() {
    const latest_jobs = {
        latest:[
            {   job_id: 1,
                image_url : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACB0lEQVR4AcXUA4wkURSF4Y65tl1oozQK17Zt70Zr27Zt2wjWts0xYt3hGbW7MJ386fh8hVem/fVFmlfOSUsqOGh1JQdtrOKk7VWdtK+6iw7XcNHx2k46V8dNl+q56UZWtxu46G4jgR4yAj1mPfSC89BrXqD3vIc+WUT6bBHou1WkHzaB/tgl+msX6J9DpHiHRIlZ/0lOCVFat16C6VQtGx3jFMMBySPG2U3Zv2xAdgfrC4YB0jt0UXLGAUDnrNG6A9IWrmiI7SIAdKyBoBvgf9u20dj1CUCn+WjNARkTp5uxGRiAGFkzQFK3bgr2QgKgM4ysGpDab7AbW2EB0FlWjhiQ0GeggJ2IAOgcI4UN+NUaR00lAF2wxoYMSBozGS+cRgAgGCko4HeLjjhqGgOAsMT4BSQsX854L2gIQJc52QvwCVeuOwAIswIAfRs6HkfNGAC6xiv0sUtfvO3GA7Y2iqWlfItpJQLY20ChKaXtOa10tl1kKGBHXRHjiJZwTaYYAtjHxXmNo7VK13W6ArbXwZX7bxHXbIougH2NooOOo2Wudgs0BeysI4U8jpbwzadpAthdTw57HC23tpyhCrC7fuTjaIWj9ZyIADtx1DRoEdt0WlgAvHBatkrotCIkwA4cNR1azDWdFBBwgI1VORLBnVB/5SreCQB2N4wybNzrdOzEOTc4fCcyASRu7AlXUGPrAAAAAElFTkSuQmCC', 
                salary : 3000, 
                job_title : 'Backend developer', 
                company_name : 'Kapital bank', 
                post_views : 1000,
                post_applies: 1000, 
                post_start_date : "27.03.2023", 
                post_end_date : "20.04.2023", 
                location : "Bakı", 
                job_time_type : "Tam iş günü"
            },
            {   job_id: 2,
                image_url : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACB0lEQVR4AcXUA4wkURSF4Y65tl1oozQK17Zt70Zr27Zt2wjWts0xYt3hGbW7MJ386fh8hVem/fVFmlfOSUsqOGh1JQdtrOKk7VWdtK+6iw7XcNHx2k46V8dNl+q56UZWtxu46G4jgR4yAj1mPfSC89BrXqD3vIc+WUT6bBHou1WkHzaB/tgl+msX6J9DpHiHRIlZ/0lOCVFat16C6VQtGx3jFMMBySPG2U3Zv2xAdgfrC4YB0jt0UXLGAUDnrNG6A9IWrmiI7SIAdKyBoBvgf9u20dj1CUCn+WjNARkTp5uxGRiAGFkzQFK3bgr2QgKgM4ysGpDab7AbW2EB0FlWjhiQ0GeggJ2IAOgcI4UN+NUaR00lAF2wxoYMSBozGS+cRgAgGCko4HeLjjhqGgOAsMT4BSQsX854L2gIQJc52QvwCVeuOwAIswIAfRs6HkfNGAC6xiv0sUtfvO3GA7Y2iqWlfItpJQLY20ChKaXtOa10tl1kKGBHXRHjiJZwTaYYAtjHxXmNo7VK13W6ArbXwZX7bxHXbIougH2NooOOo2Wudgs0BeysI4U8jpbwzadpAthdTw57HC23tpyhCrC7fuTjaIWj9ZyIADtx1DRoEdt0WlgAvHBatkrotCIkwA4cNR1azDWdFBBwgI1VORLBnVB/5SreCQB2N4wybNzrdOzEOTc4fCcyASRu7AlXUGPrAAAAAElFTkSuQmCC', 
                salary : 3000, 
                job_title : 'Backend developer', 
                company_name : 'Kapital bank', 
                post_views : 1000,
                post_applies: 1000, 
                post_start_date : "27.03.2023", 
                post_end_date : "20.04.2023", 
                location : "Bakı", 
                job_time_type : "Tam iş günü"
            },
            {   job_id: 3,
                image_url : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACB0lEQVR4AcXUA4wkURSF4Y65tl1oozQK17Zt70Zr27Zt2wjWts0xYt3hGbW7MJ386fh8hVem/fVFmlfOSUsqOGh1JQdtrOKk7VWdtK+6iw7XcNHx2k46V8dNl+q56UZWtxu46G4jgR4yAj1mPfSC89BrXqD3vIc+WUT6bBHou1WkHzaB/tgl+msX6J9DpHiHRIlZ/0lOCVFat16C6VQtGx3jFMMBySPG2U3Zv2xAdgfrC4YB0jt0UXLGAUDnrNG6A9IWrmiI7SIAdKyBoBvgf9u20dj1CUCn+WjNARkTp5uxGRiAGFkzQFK3bgr2QgKgM4ysGpDab7AbW2EB0FlWjhiQ0GeggJ2IAOgcI4UN+NUaR00lAF2wxoYMSBozGS+cRgAgGCko4HeLjjhqGgOAsMT4BSQsX854L2gIQJc52QvwCVeuOwAIswIAfRs6HkfNGAC6xiv0sUtfvO3GA7Y2iqWlfItpJQLY20ChKaXtOa10tl1kKGBHXRHjiJZwTaYYAtjHxXmNo7VK13W6ArbXwZX7bxHXbIougH2NooOOo2Wudgs0BeysI4U8jpbwzadpAthdTw57HC23tpyhCrC7fuTjaIWj9ZyIADtx1DRoEdt0WlgAvHBatkrotCIkwA4cNR1azDWdFBBwgI1VORLBnVB/5SreCQB2N4wybNzrdOzEOTc4fCcyASRu7AlXUGPrAAAAAElFTkSuQmCC', 
                salary : 3000, 
                job_title : 'Backend developer', 
                company_name : 'Kapital bank', 
                post_views : 1000,
                post_applies: 1000, 
                post_start_date : "27.03.2023", 
                post_end_date : "20.04.2023", 
                location : "Bakı", 
                job_time_type : "Tam iş günü"
            },
            {   job_id: 4,
                image_url : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACB0lEQVR4AcXUA4wkURSF4Y65tl1oozQK17Zt70Zr27Zt2wjWts0xYt3hGbW7MJ386fh8hVem/fVFmlfOSUsqOGh1JQdtrOKk7VWdtK+6iw7XcNHx2k46V8dNl+q56UZWtxu46G4jgR4yAj1mPfSC89BrXqD3vIc+WUT6bBHou1WkHzaB/tgl+msX6J9DpHiHRIlZ/0lOCVFat16C6VQtGx3jFMMBySPG2U3Zv2xAdgfrC4YB0jt0UXLGAUDnrNG6A9IWrmiI7SIAdKyBoBvgf9u20dj1CUCn+WjNARkTp5uxGRiAGFkzQFK3bgr2QgKgM4ysGpDab7AbW2EB0FlWjhiQ0GeggJ2IAOgcI4UN+NUaR00lAF2wxoYMSBozGS+cRgAgGCko4HeLjjhqGgOAsMT4BSQsX854L2gIQJc52QvwCVeuOwAIswIAfRs6HkfNGAC6xiv0sUtfvO3GA7Y2iqWlfItpJQLY20ChKaXtOa10tl1kKGBHXRHjiJZwTaYYAtjHxXmNo7VK13W6ArbXwZX7bxHXbIougH2NooOOo2Wudgs0BeysI4U8jpbwzadpAthdTw57HC23tpyhCrC7fuTjaIWj9ZyIADtx1DRoEdt0WlgAvHBatkrotCIkwA4cNR1azDWdFBBwgI1VORLBnVB/5SreCQB2N4wybNzrdOzEOTc4fCcyASRu7AlXUGPrAAAAAElFTkSuQmCC', 
                salary : 3000, 
                job_title : 'Backend developer', 
                company_name : 'Kapital bank', 
                post_views : 1000,
                post_applies: 1000, 
                post_start_date : "27.03.2023", 
                post_end_date : "20.04.2023", 
                location : "Bakı", 
                job_time_type : "Tam iş günü"
            },
            {   job_id: 5,
                image_url : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACB0lEQVR4AcXUA4wkURSF4Y65tl1oozQK17Zt70Zr27Zt2wjWts0xYt3hGbW7MJ386fh8hVem/fVFmlfOSUsqOGh1JQdtrOKk7VWdtK+6iw7XcNHx2k46V8dNl+q56UZWtxu46G4jgR4yAj1mPfSC89BrXqD3vIc+WUT6bBHou1WkHzaB/tgl+msX6J9DpHiHRIlZ/0lOCVFat16C6VQtGx3jFMMBySPG2U3Zv2xAdgfrC4YB0jt0UXLGAUDnrNG6A9IWrmiI7SIAdKyBoBvgf9u20dj1CUCn+WjNARkTp5uxGRiAGFkzQFK3bgr2QgKgM4ysGpDab7AbW2EB0FlWjhiQ0GeggJ2IAOgcI4UN+NUaR00lAF2wxoYMSBozGS+cRgAgGCko4HeLjjhqGgOAsMT4BSQsX854L2gIQJc52QvwCVeuOwAIswIAfRs6HkfNGAC6xiv0sUtfvO3GA7Y2iqWlfItpJQLY20ChKaXtOa10tl1kKGBHXRHjiJZwTaYYAtjHxXmNo7VK13W6ArbXwZX7bxHXbIougH2NooOOo2Wudgs0BeysI4U8jpbwzadpAthdTw57HC23tpyhCrC7fuTjaIWj9ZyIADtx1DRoEdt0WlgAvHBatkrotCIkwA4cNR1azDWdFBBwgI1VORLBnVB/5SreCQB2N4wybNzrdOzEOTc4fCcyASRu7AlXUGPrAAAAAElFTkSuQmCC', 
                salary : 3000, 
                job_title : 'Backend developer', 
                company_name : 'Kapital bank', 
                post_views : 1000,
                post_applies: 1000, 
                post_start_date : "27.03.2023", 
                post_end_date : "20.04.2023", 
                location : "Bakı", 
                job_time_type : "Tam iş günü"
            },
            {   job_id: 6,
                image_url : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACB0lEQVR4AcXUA4wkURSF4Y65tl1oozQK17Zt70Zr27Zt2wjWts0xYt3hGbW7MJ386fh8hVem/fVFmlfOSUsqOGh1JQdtrOKk7VWdtK+6iw7XcNHx2k46V8dNl+q56UZWtxu46G4jgR4yAj1mPfSC89BrXqD3vIc+WUT6bBHou1WkHzaB/tgl+msX6J9DpHiHRIlZ/0lOCVFat16C6VQtGx3jFMMBySPG2U3Zv2xAdgfrC4YB0jt0UXLGAUDnrNG6A9IWrmiI7SIAdKyBoBvgf9u20dj1CUCn+WjNARkTp5uxGRiAGFkzQFK3bgr2QgKgM4ysGpDab7AbW2EB0FlWjhiQ0GeggJ2IAOgcI4UN+NUaR00lAF2wxoYMSBozGS+cRgAgGCko4HeLjjhqGgOAsMT4BSQsX854L2gIQJc52QvwCVeuOwAIswIAfRs6HkfNGAC6xiv0sUtfvO3GA7Y2iqWlfItpJQLY20ChKaXtOa10tl1kKGBHXRHjiJZwTaYYAtjHxXmNo7VK13W6ArbXwZX7bxHXbIougH2NooOOo2Wudgs0BeysI4U8jpbwzadpAthdTw57HC23tpyhCrC7fuTjaIWj9ZyIADtx1DRoEdt0WlgAvHBatkrotCIkwA4cNR1azDWdFBBwgI1VORLBnVB/5SreCQB2N4wybNzrdOzEOTc4fCcyASRu7AlXUGPrAAAAAElFTkSuQmCC', 
                salary : 3000, 
                job_title : 'Backend developer', 
                company_name : 'Kapital bank', 
                post_views : 1000,
                post_applies: 1000, 
                post_start_date : "27.03.2023", 
                post_end_date : "20.04.2023", 
                location : "Bakı", 
                job_time_type : "Tam iş günü"
            },
            {   job_id: 7,
                image_url : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACB0lEQVR4AcXUA4wkURSF4Y65tl1oozQK17Zt70Zr27Zt2wjWts0xYt3hGbW7MJ386fh8hVem/fVFmlfOSUsqOGh1JQdtrOKk7VWdtK+6iw7XcNHx2k46V8dNl+q56UZWtxu46G4jgR4yAj1mPfSC89BrXqD3vIc+WUT6bBHou1WkHzaB/tgl+msX6J9DpHiHRIlZ/0lOCVFat16C6VQtGx3jFMMBySPG2U3Zv2xAdgfrC4YB0jt0UXLGAUDnrNG6A9IWrmiI7SIAdKyBoBvgf9u20dj1CUCn+WjNARkTp5uxGRiAGFkzQFK3bgr2QgKgM4ysGpDab7AbW2EB0FlWjhiQ0GeggJ2IAOgcI4UN+NUaR00lAF2wxoYMSBozGS+cRgAgGCko4HeLjjhqGgOAsMT4BSQsX854L2gIQJc52QvwCVeuOwAIswIAfRs6HkfNGAC6xiv0sUtfvO3GA7Y2iqWlfItpJQLY20ChKaXtOa10tl1kKGBHXRHjiJZwTaYYAtjHxXmNo7VK13W6ArbXwZX7bxHXbIougH2NooOOo2Wudgs0BeysI4U8jpbwzadpAthdTw57HC23tpyhCrC7fuTjaIWj9ZyIADtx1DRoEdt0WlgAvHBatkrotCIkwA4cNR1azDWdFBBwgI1VORLBnVB/5SreCQB2N4wybNzrdOzEOTc4fCcyASRu7AlXUGPrAAAAAElFTkSuQmCC', 
                salary : 3000, 
                job_title : 'Backend developer', 
                company_name : 'Kapital bank', 
                post_views : 1000,
                post_applies: 1000, 
                post_start_date : "27.03.2023", 
                post_end_date : "20.04.2023", 
                location : "Bakı", 
                job_time_type : "Tam iş günü"
            },
            {   job_id: 8,
                image_url : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACB0lEQVR4AcXUA4wkURSF4Y65tl1oozQK17Zt70Zr27Zt2wjWts0xYt3hGbW7MJ386fh8hVem/fVFmlfOSUsqOGh1JQdtrOKk7VWdtK+6iw7XcNHx2k46V8dNl+q56UZWtxu46G4jgR4yAj1mPfSC89BrXqD3vIc+WUT6bBHou1WkHzaB/tgl+msX6J9DpHiHRIlZ/0lOCVFat16C6VQtGx3jFMMBySPG2U3Zv2xAdgfrC4YB0jt0UXLGAUDnrNG6A9IWrmiI7SIAdKyBoBvgf9u20dj1CUCn+WjNARkTp5uxGRiAGFkzQFK3bgr2QgKgM4ysGpDab7AbW2EB0FlWjhiQ0GeggJ2IAOgcI4UN+NUaR00lAF2wxoYMSBozGS+cRgAgGCko4HeLjjhqGgOAsMT4BSQsX854L2gIQJc52QvwCVeuOwAIswIAfRs6HkfNGAC6xiv0sUtfvO3GA7Y2iqWlfItpJQLY20ChKaXtOa10tl1kKGBHXRHjiJZwTaYYAtjHxXmNo7VK13W6ArbXwZX7bxHXbIougH2NooOOo2Wudgs0BeysI4U8jpbwzadpAthdTw57HC23tpyhCrC7fuTjaIWj9ZyIADtx1DRoEdt0WlgAvHBatkrotCIkwA4cNR1azDWdFBBwgI1VORLBnVB/5SreCQB2N4wybNzrdOzEOTc4fCcyASRu7AlXUGPrAAAAAElFTkSuQmCC', 
                salary : 3000, 
                job_title : 'Backend developer', 
                company_name : 'Kapital bank', 
                post_views : 1000,
                post_applies: 1000, 
                post_start_date : "27.03.2023", 
                post_end_date : "20.04.2023", 
                location : "Bakı", 
                job_time_type : "Tam iş günü"
            },
            {   job_id: 9,
                image_url : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACB0lEQVR4AcXUA4wkURSF4Y65tl1oozQK17Zt70Zr27Zt2wjWts0xYt3hGbW7MJ386fh8hVem/fVFmlfOSUsqOGh1JQdtrOKk7VWdtK+6iw7XcNHx2k46V8dNl+q56UZWtxu46G4jgR4yAj1mPfSC89BrXqD3vIc+WUT6bBHou1WkHzaB/tgl+msX6J9DpHiHRIlZ/0lOCVFat16C6VQtGx3jFMMBySPG2U3Zv2xAdgfrC4YB0jt0UXLGAUDnrNG6A9IWrmiI7SIAdKyBoBvgf9u20dj1CUCn+WjNARkTp5uxGRiAGFkzQFK3bgr2QgKgM4ysGpDab7AbW2EB0FlWjhiQ0GeggJ2IAOgcI4UN+NUaR00lAF2wxoYMSBozGS+cRgAgGCko4HeLjjhqGgOAsMT4BSQsX854L2gIQJc52QvwCVeuOwAIswIAfRs6HkfNGAC6xiv0sUtfvO3GA7Y2iqWlfItpJQLY20ChKaXtOa10tl1kKGBHXRHjiJZwTaYYAtjHxXmNo7VK13W6ArbXwZX7bxHXbIougH2NooOOo2Wudgs0BeysI4U8jpbwzadpAthdTw57HC23tpyhCrC7fuTjaIWj9ZyIADtx1DRoEdt0WlgAvHBatkrotCIkwA4cNR1azDWdFBBwgI1VORLBnVB/5SreCQB2N4wybNzrdOzEOTc4fCcyASRu7AlXUGPrAAAAAElFTkSuQmCC', 
                salary : 3000, 
                job_title : 'Backend developer', 
                company_name : 'Kapital bank', 
                post_views : 1000,
                post_applies: 1000, 
                post_start_date : "27.03.2023", 
                post_end_date : "20.04.2023", 
                location : "Bakı", 
                job_time_type : "Tam iş günü"
            },
            {   job_id: 10,
                image_url : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACB0lEQVR4AcXUA4wkURSF4Y65tl1oozQK17Zt70Zr27Zt2wjWts0xYt3hGbW7MJ386fh8hVem/fVFmlfOSUsqOGh1JQdtrOKk7VWdtK+6iw7XcNHx2k46V8dNl+q56UZWtxu46G4jgR4yAj1mPfSC89BrXqD3vIc+WUT6bBHou1WkHzaB/tgl+msX6J9DpHiHRIlZ/0lOCVFat16C6VQtGx3jFMMBySPG2U3Zv2xAdgfrC4YB0jt0UXLGAUDnrNG6A9IWrmiI7SIAdKyBoBvgf9u20dj1CUCn+WjNARkTp5uxGRiAGFkzQFK3bgr2QgKgM4ysGpDab7AbW2EB0FlWjhiQ0GeggJ2IAOgcI4UN+NUaR00lAF2wxoYMSBozGS+cRgAgGCko4HeLjjhqGgOAsMT4BSQsX854L2gIQJc52QvwCVeuOwAIswIAfRs6HkfNGAC6xiv0sUtfvO3GA7Y2iqWlfItpJQLY20ChKaXtOa10tl1kKGBHXRHjiJZwTaYYAtjHxXmNo7VK13W6ArbXwZX7bxHXbIougH2NooOOo2Wudgs0BeysI4U8jpbwzadpAthdTw57HC23tpyhCrC7fuTjaIWj9ZyIADtx1DRoEdt0WlgAvHBatkrotCIkwA4cNR1azDWdFBBwgI1VORLBnVB/5SreCQB2N4wybNzrdOzEOTc4fCcyASRu7AlXUGPrAAAAAElFTkSuQmCC', 
                salary : 3000, 
                job_title : 'Backend developer', 
                company_name : 'Kapital bank', 
                post_views : 1000,
                post_applies: 1000, 
                post_start_date : "27.03.2023", 
                post_end_date : "20.04.2023", 
                location : "Bakı", 
                job_time_type : "Tam iş günü"
            }
        ]       
    }
    const [successMsg, setSuccessMsg] = useState(false);
    return ( 
        <div className="home_page_container">
            <SliderHome />
            {/* __________ premium jobs ____________________ */}
            <div className="latest_jobs_container">
                <div className="latest_jobs_heading">
                    Premium Elanlar
                </div>
                <div className="latest_jobs_boxes_container">
                    {
                        latest_jobs['latest'].map((item, index)=>{
                            return(
                                <PostBox 
                                    job_id = {item.job_id}
                                    image_url={item.image_url}
                                    salary={item.salary}
                                    job_title={item.job_title}
                                    company_name={item.company_name}
                                    post_views={item.post_views}
                                    post_applies = {item.post_applies}
                                    post_start_date={item.post_start_date}
                                    post_end_date={item.post_end_date}
                                    location={item.location}
                                    job_time_type={item.job_time_type}
                                    key={item.job_id}
                                    setSuccessMsg = {setSuccessMsg}
                                />
                            )
                        })
                    }
                </div>
            </div> 
            {/* __________ latest jobs container ___________ */}
            <div className="latest_jobs_container">
                <div className="latest_jobs_heading">
                    Ən Son Elanlar
                </div>
                <div className="latest_jobs_boxes_container">
                    {
                        latest_jobs['latest'].map((item, index)=>{
                            return(
                                <PostBox 
                                    job_id = {item.job_id}
                                    image_url={item.image_url}
                                    salary={item.salary}
                                    job_title={item.job_title}
                                    company_name={item.company_name}
                                    post_views={item.post_views}
                                    post_applies = {item.post_applies}
                                    post_start_date={item.post_start_date}
                                    post_end_date={item.post_end_date}
                                    location={item.location}
                                    job_time_type={item.job_time_type}
                                    key={item.job_id}
                                    setSuccessMsg = {setSuccessMsg}
                                />
                            )
                        })
                    }
                </div>
            </div>         
            {successMsg ? <NotificationMessage setSuccessMsg = {setSuccessMsg} /> : null}
        </div>
     );
}
export default Home;