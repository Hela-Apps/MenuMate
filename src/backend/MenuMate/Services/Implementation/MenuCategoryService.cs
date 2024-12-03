using Entity.Models;
using Entity.ViewModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using Repository.Interfaces;
using Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Implementation
{
    public class MenuCategoryService : IMenuCategoryService
    {
        private readonly IMenuCategoryRepository _repository;
        public readonly IItemRepository _itemRepository;
        public MenuCategoryService(IMenuCategoryRepository repository, IItemRepository itemRepository)
        {
            _repository = repository;
            _itemRepository = itemRepository;

        }

        public async Task<MenuCategory> Add(MenuCategory menuCategory)
        {
            return await _repository.Add(menuCategory);
        }

        public async Task<MenuCategory> Get(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task<MenuCategory> Update(MenuCategory menuCategory)
        {
            var oldCategory = await _repository.GetById(menuCategory.Id);
            menuCategory.CreatedDate = oldCategory.CreatedDate;
            menuCategory.CreatedBy = oldCategory.CreatedBy;
            return await _repository.Update(menuCategory);
        }

        public async Task<IEnumerable<MenuCategory>> GetAll()
        {
            return await _repository.GetAll();
        }

        public async Task<MenuCardVM> GetMenuCard()
        {
            var menuCard = new MenuCardVM();
            menuCard.MenuItems = new List<MenuItemVM>();

            var CategoryList = await _repository.GetAll();

            foreach (var category in CategoryList)
            {              
               var itemList = await _itemRepository.GetItemsByCategoryId(category.Id);

                var menuItem = new MenuItemVM
                {
                    Name = category.Name,
                    Code = category.Code,
                    MenuId = category.Id,
                    ItemList = itemList
                };
                menuCard.MenuItems.Add(menuItem);
            }
            return menuCard;
        }

        public async Task<int> GetLastId()
        {
            return await _repository.GetLastId();
        }
    }
}
