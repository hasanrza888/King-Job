export const companies = [
    {   
        company_id : 1,
        company_name: 'Kapital Bank',
        company_logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACB0lEQVR4AcXUA4wkURSF4Y65tl1oozQK17Zt70Zr27Zt2wjWts0xYt3hGbW7MJ386fh8hVem/fVFmlfOSUsqOGh1JQdtrOKk7VWdtK+6iw7XcNHx2k46V8dNl+q56UZWtxu46G4jgR4yAj1mPfSC89BrXqD3vIc+WUT6bBHou1WkHzaB/tgl+msX6J9DpHiHRIlZ/0lOCVFat16C6VQtGx3jFMMBySPG2U3Zv2xAdgfrC4YB0jt0UXLGAUDnrNG6A9IWrmiI7SIAdKyBoBvgf9u20dj1CUCn+WjNARkTp5uxGRiAGFkzQFK3bgr2QgKgM4ysGpDab7AbW2EB0FlWjhiQ0GeggJ2IAOgcI4UN+NUaR00lAF2wxoYMSBozGS+cRgAgGCko4HeLjjhqGgOAsMT4BSQsX854L2gIQJc52QvwCVeuOwAIswIAfRs6HkfNGAC6xiv0sUtfvO3GA7Y2iqWlfItpJQLY20ChKaXtOa10tl1kKGBHXRHjiJZwTaYYAtjHxXmNo7VK13W6ArbXwZX7bxHXbIougH2NooOOo2Wudgs0BeysI4U8jpbwzadpAthdTw57HC23tpyhCrC7fuTjaIWj9ZyIADtx1DRoEdt0WlgAvHBatkrotCIkwA4cNR1azDWdFBBwgI1VORLBnVB/5SreCQB2N4wybNzrdOzEOTc4fCcyASRu7AlXUGPrAAAAAElFTkSuQmCC',
        rating: 4.5,
        vacancy_count: 1000,
        apply_count: 2000
    },
    {
        company_id : 2,
        company_name: 'Leo Bank',
        company_logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEUAAAD////19fX7+/uBgYEfHx/JyckzMzPQ0NDq6urk5OSEhITw8PCwsLDn5+eTk5NbW1sNDQ3b29tERERxcXG5ublVVVWZmZmpqak4ODjBwcHV1dUuLi6Li4s9PT3e3t54eHgWFhZKSkppaWmgoKAmJiZPT0+rq6thYWFmskL+AAAEIklEQVR4nO3b63aiMBSGYYV6wlM9FUWtttZ27v8Kx1nKJoEEQotYZr3Pv8perHwGEhJsqwUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8F56GN4tHt+Re/PbN8NEtuRcvTvj06JbcCwmbj4TNR8LmI2HzkbD5SNh8JGy+byWcLT+6g9HFfLx/dahf7FeHf+XBavry3YZ+2zcSHvuybP5nEnZyy3frgVrujd9/2uZySiccau29Ws+s5Ztxtrz7WU3b3ZRMuJhnG3wxWFrqQ99YP64uQKFyCY/mBl98mMpnfVt50Ks2Ro5SCUNbgy9W2fLXkb3cr23IKZNw2rZ2Ydtw5W28nOq2/+cecQxKJDypDfS2URRttQx7vXxmGJK0M7jMMxVwT3hW4kTxNbbcKr2iN7mr9Vi0DsN1pH0jk3vkyXJPGEnT5ur++DK5cudq+V7J0j/Fnz6ruesZUZ0TPicdqB9YJOOJcmvtku7yjmr5Uhl+ahltnBPKwN9NH/mUXlQ68UtijFITwy5I+raCAIVcE/akwW+ZY1Np8nP80SzpwV26/G2Qrb8j14QfeXXSZLmzkpnzlC1/l4OGSbRyrgknt7KB6aB0ogyPciVGpnp5VvWyF0TlHBNu4nvNPP5Jp9zWDa9+6gPdTg7XMO07JnyKy8zLApkDjte/h/HfW/PpZOapYcJwTCi3Yd8ofSPKZTg1n06+sBpGU8eE2gNKjttUIk86ltXuIr5MvYrjGDgmPDgmvF2VMtBYTjcbFRRUyDFhkI5icbiWxyOvNUBhQXUqThjoAfzC81Uaxsgx4SSTxew2IcrIYzufFNh3eKrimDDenvGjbq6va/mhIOGs8CuoTsmx1HHsk8f05oylMh+6nbWB86E0ye0xS55p5ubjMr3+nmeaXnxZua0GXmXoMV6mshSrY/nkuraIh3f/7HRa17XF/YfS8uvDL9PRYHA1ih/Mc9eHi3a5K+JnXBOe85osfRLIR1LubdLVnWSNX8dGjfM+jQwOXqZZR2lxKJ8lL2RGqYgP26fZn3sW15dnyX6Tf9RPMUzCJLfV2bbXdlL22mp5ByUN8W3iOW2VtKyv7P2elYWV+itcdb90m+yXqu9qat4vtbsl1Hbp5+HnrtPZve/VFusXnb7n3V2H06/H7nkXJmy9GI8mW94jfSJ5K3har/29RXFCZUQxRk3fVb2cl2vtWjahSidUxpRMPMMQ2+pN7K/j/Do2g8snbJ2s5caXum/2d8CZWfKXJGztLG0eWx6/QuP5/XUt2a5KJrzcjIYXn1v7D0g2q2x5v9b/XvHsE2FqPhSnrnZ3jcb5g2JH/z1NUXnlzp1C2XcLs+VHP5gMBsHc7UdO7/vV4fJwPjlE09oGGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADA/+Uv2ukryGMXrecAAAAASUVORK5CYII=',
        rating: 2.3,
        vacancy_count: 50,
        apply_count: 73
    },
    {
        company_id : 3,
        company_name: 'ABB',
        company_logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADt0lEQVR4Ab1XA7AsSRCss23btm1zZs53gbNtfdu2bXumZ79t27adkdGxU3/9mBG1qJ3uLmRV9Uq+4Ew7WtywNGSuOGa8eOYDKTY4w08XJ/TFNQcOlaChOB2OKOLD/RNx2BR18FbIvvh3L6wjhYa3zEU48EFs/LC8Hp5HnRu0jQ4zsxGJ68X1n8T3APKhvDvyZD73Tuw0cWJ3IEUPyBv+tfKqf6rkjLfDm8UJpiov9wl15h2lWyU0yuK/A4fjsGcgDfDbyuT0MErdsxvCjcychMW95VH/SHpsN8Pnp4U4cBgOfVWlJbN4pr5khBe7Wi2YDK//RF5v197jc+eIE+ayFAetQKq6ihdUwPsf+F4dstb+tjwbyR5UG/0X1yN8cf1b/p3aABWV1oxMqkpAFO1z+1nCGSLwYuRp+JUtu+PwfbtQH8aoUwZARpJwiYAhTCn3DRysn8Y9PvKPzcT8+1W+ysb1+Gz1P4kCucFDEvBcn2NA5J54fhmkLvcFX5DOV/h8+goYdI5KQRfRcIMSLKss4OGu6ZXMjXAgonq3pAVDAytpNRet52YaOXQ69gI3eAnrK0LmJxiyl8TEOaLBmkZPZ5v1TE2VhtelAGC4nfBN7D0moW13jJx5eehJcYI4wee6ErCwvxQC6LFjvsWeO5Vz1YQASXSNW90Q1d9fKbz2HrsHe25RlfamMNdUoFm8NuzseDV4Zh7FNYPJ9vwMrjdil1Ne9y8UC6ZVpwIfFkUEQT8vLLw26AzVAXfTEGE1/aIqo4mw4UQE2YA0PC6FBdd8GaUyaCqfjD1KRXw32zyBKZYwuUqyLAsKMF0NsT1MMchnSfjpIR0NylYJNbsShv3O2V4QOME/ivmfWiJ+mWYWBF/oUomHyjGDaAzqOgfynSsayL3aq1duNyGM0ARDtslb4ROSC7ywMrughr2k8BKbCezVbvi9vN//BHZHNCZ87wvmPpbG2ytTEG+cNbqkmpphnAcZS5o9nA9ugjEvZC6xoAoJlmgQZr7do32q+wTnS1rAU9UV/0wcvbxweGEL1c3miwauXGq9pwwYbfWbJSPQsVTeN3FAkYBmFskIfYKMjbwffAG+77D6NfYKXw4yIlobzMylefTL4YK5nMMFvUJdZvW6X2lQstE/Sm7znFUw3bJ3t/COEMaof8t/lA0GRFVG/6uG10L+xr9u1G0kMb3ga07FgoAeO+FHNi2b7V2vtvJwJyup6MAbU7M0adlL44oaDL9rqiYcvoVlW5zgf0KUHf+AvGGuknziIEpCPGOkJSPpAAAAAElFTkSuQmCC',
        rating: 4,
        vacancy_count: 200,
        apply_count: 403
    },
    {
        company_id : 4,
        company_name: 'İşland',
        company_logo: 'https://isaxtar.vercel.app/static/media/island_logo.2167cfece2afdc79b50d89dc88831b8a.svg',
        rating: 5,
        vacancy_count: 400,
        apply_count: 500
    },
    {
        company_id : 5,
        company_name: 'Algoritmika',
        company_logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALoAAAC6CAMAAAAu0KfDAAAAbFBMVEVgK3r///9MAGtUDnGxn7zNw9RRAG9XF3NaH3afiK1dJXjHvM/d1eJHAGhYGnT39vhsP4Py7/RwRoaXfaa5qcKQdKDTydlBAGTl3ujs5+/AsshlNH59WZKtmLiNb555Uo6HZ5mkkLEqAFaCYJUt9iPDAAAEG0lEQVR4nO2c63aqMBBGqViIMXITL9hW2+P7v+NBm4lgQ+Css+gka337T6s1uE2HySQEowgAAAAAAAAAAAAAAAAAAAAAAMA/kcxFOrd5Wi/nod6KmdUXL3PxGkMd6lCHOtShDnWoQx3qYannhtDUVVV887YtA1NfLuQ3Qqqw1MtKUotkGZb6fmNayGJaxPii/t6ZI29eQ1LPD50m4j0k9Y+k22YzKWI8US9kt038EY76a8+8PVHDUd9l/UZyHYq6oqQu9U+xC0W91p0uK/0ZZDVhRPVBvdzRom290r+ldRjqSg9HsiprHTHpeTw/+qD+pZN6G+ENRX22D0E9j7Ru3BYAO/0fSL5CUH/VlZfM2gdrHewyGp1xeKB+0R2dbm+PFrrdeA3Gr15S5XU43h6utJCo/FenfKhdFRXuh7Ecw66eU+W10KmcHscr39XX9MJUD6BLnSplNXKisqtvdRGQ0SCkTOk+UoNxq5vKK6ahvzzThxmpwbjVa/3+nYLL8pSP6p0uNpGt6EQdqcGY1RW9vXxo5rvn8PdSnSovWRwfTy5pupc4I4ZXvaR3F5+dZ5tpqZ1XfU1DZ9JLhJ9UwAtXxPCqU+UVJf1PRKl9cfJVvSHF9CmF0z/DWYOxqq9oDWPzdD6eabKaHO0tudXNwrS4PP1FUdUutn6qn+g14rzuc6L02M60vVTfmo1nMu7T2ZE2fKIyqqtKjjdPhyOGUb1Oxlu3w+zgiMqnXl4nbfZLBmswPnU1pdPbGuw6dKLyqa8mvvNgDcanPq3THTUYm/qJRp22yLJijrAZmF6zqZvMKK4rK48jDJyoXOrKjDqHgTLFDFhyoAbjUl9RQIihS16NuZSa2k9UJvXyQvGyGVxtMcW8sJ+oTOqm8nJsCDDbBmTV+KOem0B2bMMoTbdLaw3Go26WWuSbY9J/MpOorS0/8qjXbinNsXJ+QBb18t0dCsQXyVlrMBZ1s/wvBmurO3uKK2GbLLGom0u8YmQLBi3IRAtLxHCol382hDXrPTjR6w6W3T0s6srgNn/JXa/kXl//D6AOdahDHepQhzrUoQ51qPurvp9bPbN+e8OHcyXgh+SH7Rizf3tDlFqJJ958dDeXse0Qs5sPIKe7q3TCRcrfRGYTtqjf+zzyzPy24XhSvO8LrsBwIKa4qyIbP9LvI9PRG2GayMM+vxOP9PtReBfnhHRvflU+xjkh3hzu6jL71x39Dw73Y+W1+W1sGlgzzSMvc0uP1HofTyM9jnNCFhb34yUA89vllh/ux3fP45wQz1focr9zSxeZ9a/M+Dn625Gysz+jrAIybydTj7sbmmsw0fJNetHu5Wdg5q178R3vn3PPlmdA3G92DCUr9hFFk18D7PMb2fUcVG7pIoI1BwAAAAAAAAAAAAAAAPAb/AWxKUjUvcUhZwAAAABJRU5ErkJggg==',
        rating: 4,
        vacancy_count: 50,
        apply_count: 67
    },
    {
        company_id : 6,
        company_name: 'Norm',
        company_logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDCUv1BKbEgJ9hxC9V3zZGnwaKw6dSXT1B5Q&usqp=CAU',
        rating: 4.5,
        vacancy_count: 60,
        apply_count: 86
    },
]